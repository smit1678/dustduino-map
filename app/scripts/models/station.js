/*global Air, Backbone*/

Air.Models = Air.Models || {};

(function () {
    'use strict';

    Air.Models.Station = Backbone.Model.extend({
        defaults: {},
        url: 'local/fake-stations.json',
        parse: function(geoJson, options) {
            return geoJson;
        }
    });

})();
