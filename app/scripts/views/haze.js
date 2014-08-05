/*global Air, Backbone, JST*/

Air.Views = Air.Views || {};

(function () {
    'use strict';

    Air.Views.Haze = Backbone.View.extend({
        events: {},
        initialize: function () {
            var $el = this.$el;
            window.setTimeout(function() {
                $el.addClass('poor');
            }, 600);
        },
    });

})();
