/*global Air, Backbone*/

Air.Collections = Air.Collections || {};

(function () {
    'use strict';

    // collection file for a single sensor
    Air.Collections.Sensor = Backbone.Collection.extend({
        model: Air.Models.Reading,
        //url: 'http://thawing-cove-4522.herokuapp.com/api/readings/',

        // fake function to mock a real collection
        // development purposes only
        fakeTrigger: function() {
            var hours = 72,
                records = [],
                i = 0;

            for(; i < hours; ++i) {
                records.push({
                    owner: 'arduino',
                    created: i,
                    pm10_reading: Math.round(Math.random() * 500),
                    pm25_reading: Math.round(Math.random() * 500),
                    pm10: Math.round(Math.random() * 100),
                    pm25: Math.round(Math.random() * 100),
                });
            }

            this.reset(records);
        },
    });
})();
