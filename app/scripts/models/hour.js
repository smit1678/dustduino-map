/*global Air, Backbone*/

Air.Models = Air.Models || {};

(function () {
    'use strict';

    Air.Models.Hour = Backbone.Model.extend({

        defaults: {
            pm25: -1,
            pm10: -1,
            day: -1,
            hour: -1
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
