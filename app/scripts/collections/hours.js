/*global Air, Backbone*/

Air.Collections = Air.Collections || {};

(function () {
    'use strict';

    Air.Collections.Hours = Backbone.Collection.extend({

        model: Air.Models.Hours

    });

})();
