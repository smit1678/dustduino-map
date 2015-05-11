/*global Air, Backbone, JST*/

Air.Views = Air.Views || {};

(function () {
    'use strict';

    Air.Views.Map = Backbone.View.extend({

        initialize: function (options) {
            // Listen for server response.
            this.listenToOnce(this.collection, 'reset', this.render);

            // Set internal $
            this.setElement($('#' + options.id));

            // Layer group and map; add layer to map.
            this.layer = L.featureGroup().on('click', this.click.bind(this));
            this.map = L.mapbox.map(options.id, 'devseed.j586d1hp');
            this.layer.addTo(this.map);

            // Cache popup and the graphs that we will draw in them.
            this.popup = L.popup();
            this.popupContent = JST['app/scripts/templates/tooltip.ejs'];
        },

        // TODO currently all markers are one color, unless they have no value,
        // in which case they are deactivated gray.
        //
        // If we want to create some sort of color scale that goes with the
        // pollution value, that would go here.
        color: function(model) {
            if (model.get('has_last')) {
                return '';
            }
            return 'null';
        },

        render: function() {
            // Roughly the default center of Sao Paulo, used as a default.
            var center = {
                lat: -23.6824124,
                lon: -46.5952992
            };

            var getColor = this.color;
            var markers = this.collection.map(function(model) {
                return {
                    id: model.get('id'),
                    lat: model.get('lat') || center.lat,
                    lon: model.get('lon') || center.lon,
                    last: model.get('last_reading').pm25,
                    colorClass: getColor(model)
                }
            });

            var layer = this.layer;
            _.each(markers, function(marker) {
                var iconMarker = L.marker([marker.lat, marker.lon], {
                    icon: L.divIcon({
                        className: 'circle-marker ' + marker.colorClass,
                        html: marker.last,
                        iconSize: [48, 48]
                    })
                });
                iconMarker._code = marker.id;
                iconMarker.addTo(layer);
            });

            this.map.fitBounds(_.map(markers, function(marker) {
                return [marker.lat, marker.lon]
            }));

            return this;
        },

        click: function(e) {
            var id = e.layer._code;
            var model = this.collection.find(function(model) {
                return model.get('id') === id;
            });
            if (!model) {
                return false;
            }
            this.popup.setLatLng([model.get('lat'), model.get('lon')])
                .setContent(this.popupContent(model.attributes))
                .openOn(this.map);
        }
    });
})();
