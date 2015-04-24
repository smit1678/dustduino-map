Air.Views = Air.Views || {};
(function () {
    'use strict';
    // just something to switch around our header selection
    Air.Views.Search = Backbone.View.extend({
        events: {
            'submit form': 'submit'
        },

        initialize: function() {
            this.$input = this.$('input[type="text"]');
        },

        submit: function(e) {

        },
    });
})();
