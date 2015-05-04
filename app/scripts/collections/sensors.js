/*global Air, Backbone*/

Air.Collections = Air.Collections || {};

(function () {
    'use strict';

    // collection for multiple sensors
    Air.Collections.Sensors = Backbone.Collection.extend({
        model: Air.Models.Sensor,
        url: 'http://brazil-sensor.herokuapp.com/api/v1/sensors/',
        parse: function(resp) {
            return resp.results;
        }
    });

})();
