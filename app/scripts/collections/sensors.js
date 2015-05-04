/*global Air, Backbone*/

Air.Collections = Air.Collections || {};

(function () {
    'use strict';

    // collection for multiple sensors
    Air.Collections.Sensors = Backbone.Collection.extend({
        model: Air.Models.Sensor,
        url: 'http://thawing-cove-4522.herokuapp.com/api/readings/',
        parse: function(resp) {
            console.log(resp)
            return resp
        }
    });

})();
