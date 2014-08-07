/*global Air, Backbone, JST*/

Air.Views = Air.Views || {};

(function () {
    'use strict';

    Air.Views.Modal = Backbone.View.extend({
        events: { 'click .close': 'close' },
        initialize: function() {
            var close = $.proxy(this.close, this);
            $('body').one('click', close);
        },

        close: function() {
            var $this = this.$el;
            $this.fadeOut(200, function() {
                $this.remove();
            });
        }
    });

})();
