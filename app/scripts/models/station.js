/*global Air, Backbone*/

Air.Models = Air.Models || {};

(function () {
    'use strict';

    Air.Models.Station = Backbone.Model.extend({

        url: '',

        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
