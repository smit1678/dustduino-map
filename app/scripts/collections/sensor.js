/*global Air, Backbone*/

Air.Collections = Air.Collections || {};

(function () {
    'use strict';

    // collection file for a single sensor
    Air.Collections.Sensor = Backbone.Collection.extend({
        model: Air.Models.Reading,
        url: 'http://thawing-cove-4522.herokuapp.com/api/readings/',


    });
})();
