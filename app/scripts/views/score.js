/*global Air, Backbone, JST*/

Air.Views = Air.Views || {};

(function () {
    'use strict';

    Air.Views.Score = Backbone.View.extend({
        events: {},
        initialize: function () {
            this.$now = this.$('#condition-now');
            this.render();
        },

        render: function () {
            this.$now.css({'background-color': '#FFDC73'})
                .text('Poor');
        }

    });

})();
