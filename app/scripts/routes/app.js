/*global Air, Backbone*/

Air.Routers = Air.Routers || {};

(function () {
    'use strict';

    Air.Routers.App = Backbone.Router.extend({
        routes: {
            //':subject/:locale/:metric/:year': 'render',
            ''                              : 'fresh',
        },

        fresh: function() {
            // init map
            new Air.Views.Map({el: '#paulo-map', id: 'paulo-map'});
        },

    });

})();
