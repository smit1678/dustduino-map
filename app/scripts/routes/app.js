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
            Air.map = Air.map || L.mapbox.map('paulo-map', 'devseed.j586d1hp')
                .setView([-23.611, -46.715], 10);

            // init modals
            $('.modal').each(function() { new Air.Views.Modal({el: '#' + this.id}); });

            // init station model
            var stations = new Air.Models.Station();

            // init all views
            new Air.Views.Map({el: '#paulo-map', id: 'paulo-map', model: stations});
            //new Air.Views.Haze({el: '#haze', id: 'haze', model: stations});
            //new Air.Views.Score({el: '#scorecard', id: 'scorecard', model: stations});
            //new Air.Views.Hourly({el: '#hourly-chart', id: 'hourly-chart', model: hourly});

            // load station data
            stations.fetch({reset:true});
        },

    });

})();
