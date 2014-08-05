/*global Air, Backbone*/

Air.Collections = Air.Collections || {};

(function () {
    'use strict';

    Air.Collections.Stations = Backbone.Collection.extend({

        model: Air.Models.Station

    });

})();
