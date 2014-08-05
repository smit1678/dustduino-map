/*global Air, Backbone, JST*/

Air.Views = Air.Views || {};

(function () {
    'use strict';

    Air.Views.Haze = Backbone.View.extend({
        events: {},
        initialize: function () {
            this.listenTo(this.collection, 'change', this.render);
        },
        render: function () {
        }

    });

})();
