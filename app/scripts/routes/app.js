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
            /*
            Air.map = Air.map || L.mapbox.map('paulo-map', 'devseed.j586d1hp')
                .setView([-23.611, -46.715], 10);
            */

            // init modals
            $('.modal').each(function() { new Air.Views.Modal({el: '#' + this.id}); });

            // init station model
            var stations = new Air.Models.Station();

            // init hourly summary model
            var hours = new Air.Collections.Hours();

            // overall score
            new Air.Views.Score({el: '#scorecard', id: 'scorecard', collection: hours});
            // hourly chart
            new Air.Views.Chart({el: '#hourly-chart', id: 'hourly-chart', collection: hours});

            // some views rely on the map being ready
            /*
            Air.map.whenReady(function() {

                // map station indicators
                new Air.Views.Map({el: '#paulo-map', id: 'paulo-map', model: stations});

                // background pollution indicator
                new Air.Views.Haze({model: stations});

                stations.fetch({reset:true});
            });
            */

            // testing only
            stations.fetch({reset:true});
        },

    });

})();
