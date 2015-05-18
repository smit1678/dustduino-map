/*global Air, Backbone*/

Air.Collections = Air.Collections || {};

(function () {
    'use strict';

    // collection for multiple sensors
    Air.Collections.Readings = Backbone.Collection.extend({
        model: Air.Models.Reading,
        url:  Air.api + '/readings',
        initialize: function(options) {
            if (options.id) {
                this.url += ('/?sensor_id=' + options.id);
            }
        },
        parse: function(resp) {
            if (resp.results) {
                return resp.results;
            } else return resp;
        }
    });

})();
