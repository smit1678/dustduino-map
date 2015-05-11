/*global Air, Backbone*/

Air.Models = Air.Models || {};

(function () {
    'use strict';
    Air.Models.Reading = Backbone.Model.extend({
        defaults: {
            created: null,
            owner: null,
            pm10: null,
            pm10_reading: null,
            pm25: null,
            pm25_reading: null
        },
    });
})();
