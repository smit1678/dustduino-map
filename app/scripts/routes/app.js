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

            //************************** Map **************************//
            Air.map = Air.map || L.mapbox.map('paulo-map', 'devseed.j586d1hp')
                .setView([-23.611, -46.715], 10);

            //************************** Data **************************//
            var stations = new Air.Models.Station();    // station locations
            var hours = new Air.Collections.Hours();    // hourly data

            //************************** Views **************************//
            $('.modal').each(function() { new Air.Views.Modal({el: '#' + this.id}); });
            new Air.Views.Score({el: '#scorecard', id: 'scorecard', collection: hours});
            new Air.Views.Chart({el: '#hourly-chart', id: 'hourly-chart',
                                collection: hours});
            new Air.Views.Localtime({el: '#local-time', id:'local-time'});

            Air.map.whenReady(function() {
                new Air.Views.Map({el: '#paulo-map', id: 'paulo-map', model: stations});
                new Air.Views.Haze({model: stations});
                stations.fetch({reset:true});
            });

            hours.fetch({reset: true});
        },

    });

})();
