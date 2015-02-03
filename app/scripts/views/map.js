/*global Air, Backbone, JST*/

Air.Views = Air.Views || {};

(function () {
    'use strict';

    Air.Views.Map = Backbone.View.extend({

        initialize: function (options) {
            var $el = $('#' + options.id);
            this.setElement($el);

            //var map = this.map = L.mapbox.map(options.id/*, 'devseed.j586d1hp'*/);
            var map = this.map = L.mapbox.map(options.id, 'devseed.j586d1hp');
            map.scrollWheelZoom.disable();

            // Set location of the map.
            // If it's a single point, center on the point.
            // If multiple points, use map.fitBounds.
            var locations = options.locations;
            if (locations.length > 1) {
                map.fitBounds(locations);
            } else {
                map.setView(locations[0], 11);
            }

            var popupContent = JST['app/scripts/templates/tooltip.ejs'];
            var markerLayer = L.layerGroup(_.map(locations, function(location) {
                return L.marker(location, {
                    icon: L.icon({
                        iconUrl: '/images/transmit_36.png',
                        iconSize: [36,36],
                        className: 'icon-marker',
                    })
                }).bindPopup(popupContent({
                    // TODO replace with data from model
                    name: 'Sensor #123',
                    location: 'Bus Stop at 780 Fake Road',
                    src: 'images/fake-station.jpg',
                    id: options.id,
                }, { offset: [12,0] }));
            }));

            // using icon markers, but leaving this in case we want to switch back
            // var markerLayer = L.layerGroup(_.map(locations, function(location) {
                // return L.circleMarker(location, { className: 'circle-marker' });
            // }));

            this.markers = markerLayer;

            setTimeout(function() {
                markerLayer.addTo(map);
            }, 600);

            map.on('popupopen', this.popopen.bind(this));
            map.on('popupclose', this.popclose.bind(this));

            this.popups = [];

            return;
        },

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
