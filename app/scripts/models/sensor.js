/*global Air, Backbone*/

Air.Models = Air.Models || {};

(function () {
    'use strict';


    // collection for multiple sensors
    Air.Models.Sensor = Backbone.Model.extend({
        initialize: function() {

            // If lat/lon are missing, set a sensible default so we can map it,
            // but make sure to point out that it's lacking geo data.
            if (!this.attributes.lat || !this.attributes.lon) {
                this.set('lat', this.defaults.lat)
                this.set('lon', this.defaults.lon)
                this.set('geocoded', false);
            }

            // Similar to location, if there's no last reading then
            // set the defaults to n/a for display, and show that it has no reading.
            if (!this.attributes.last_reading) {
                this.set('last_reading', this.defaults.last_reading);
                this.set('has_last', false);
            }
        },


        defaults: {
            id: null,
            sensor_name: '',

            // Default is the center of Sao Paulo
            lat: -23.6824124,
            lon: -46.5952992,

            address: '',
            serial: null,
            account: null,
            last_reading: {
                pm10: 'n/a',
                pm10count: 'n/a',
                pm25: 'n/a',
                pm25count: 'n/a'
            },

            geocoded: true,
            has_last: true
        }
    });
})();
