/*global Air, Backbone, JST*/

Air.Views = Air.Views || {};

(function () {
    'use strict';

    Air.Views.Map = Backbone.View.extend({

        initialize: function (options) {
            this.listenToOnce(this.collection, 'reset', this.render);
            this.setElement($('#' + options.id));
            this.popupContent = JST['app/scripts/templates/tooltip.ejs'];
            this.layer = L.featureGroup().on('click', this.click.bind(this));
            this.map = L.mapbox.map(options.id, 'devseed.j586d1hp');
            this.layer.addTo(this.map);
            this.map.scrollWheelZoom.disable();
        },

        // TODO currently all markers are one color, unless they have no value,
        // in which case they are deactivated gray.
        //
        // If we want to create some sort of color scale that goes with the
        // pollution value, that would go here.
        color: function(reading) {
            if (!reading) {
                return 'null';
            }
            return '';
        },

        render: function() {
            // Roughly the default center of Sao Paulo, used as a default.
            var center = {
                lat: -23.6824124,
                lon: -46.5952992
            };

            var getColor = this.color;
            var markers = this.collection.map(function(model) {
                var last = model.get('last_reading');
                return {
                    id: model.get('id'),
                    lat: model.get('lat') || center.lat,
                    lon: model.get('lon') || center.lon,
                    last: (last ? last.pm25 : 'n/a'),
                    colorClass: last
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

        click: function() {},

        popopen: function() {
            var $pop = this.$('.map-pop'),
                $container = $pop.find('#' + this.id + '-chart'),
                name = $pop.find('#' + this.id + '-pop').text();

            this.popups.push(new Air.Views.Chart({
                collection: this.collection,
                el: $container,
                id: this.id + '-chart',
                render: true,
            }));

        },

        popclose: function() {
            _.each(this.popups, function(popup) {
                popup.remove();
            });
            this.popups = [];
        }

    });

})();
