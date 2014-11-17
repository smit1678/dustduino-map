/*global Air, Backbone, JST*/

Air.Views = Air.Views || {};

(function () {
    'use strict';

    Air.Views.Haze = Backbone.View.extend({
        events: {},
        template: '<div id="haze"></div>',
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);

            $(Air.map.getPanes().mapPane).before(this.template);
            this.$el = $('#haze');
        },

        render: function() {
            var $el = this.$el;
            window.setTimeout(function() {
                $el.addClass('poor');
            }, 1500);
        },
    });

})();
