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

            $('.modal').each(function() {
                new Air.Views.Modal({el: '#' + this.id});
            });

            // init station collection
            var stations = new Air.Collections.Stations();

            // init map
            new Air.Views.Map({el: '#paulo-map', id: 'paulo-map', collection: stations});
            new Air.Views.Haze({el: '#haze', id: 'haze', collection: stations});
            new Air.Views.Score({el: '#scorecard', id: 'scorecard', collection: stations});
            //new Air.Views.Hourly({el: '#hourly-chart', id: 'hourly-chart', collection: hourly});
        },

    });

})();
