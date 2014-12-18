Air.Views = Air.Views || {};
(function () {
    'use strict';
    // just something to switch around our header selection
    Air.Views.Header = Backbone.View.extend({
        select: function(id) {
            this.$('.active').removeClass('active');
            this.$('#header-' + id).addClass('active');
        },
    });
})();
