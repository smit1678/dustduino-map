/*global Air, Backbone*/

Air.Collections = Air.Collections || {};

(function () {
    'use strict';

    // collection for multiple sensors
    Air.Collections.Sensors = Backbone.Collection.extend({
        model: Air.Models.Sensor,
        url: Air.api + '/sensors/',
        parse: function(resp) {
            if (resp.results) {
                return resp.results;
            }
            else return resp
        }
    });

})();
