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
                .setView([-23.557, -46.656], 11);

            //************************** Data **************************//
            var stations = new Air.Models.Station();    // station locations
            var hours = new Air.Collections.Hours();    // hourly data

            //************************** Views **************************//
            $('.modal').each(function() { new Air.Views.Modal({el: '#' + this.id}); });
            new Air.Views.Score({el: '#scorecard', id: 'scorecard', collection: hours});
            new Air.Views.Chart({el: '#hourly-chart', id: 'hourly-chart',
                                collection: hours, wait: true});
            new Air.Views.Localtime({el: '#local-time', id:'local-time'});

            Air.map.whenReady(function() {

                new Air.Views.Map({el: '#paulo-map', id: 'paulo-map', model: stations});
                stations.fetch({reset:true});

            });

            var popupcharts = [];

            Air.map.on('popupopen', function() {
                popupcharts.push(new Air.Views.Chart({el: '#pop-chart-container',
                                                 id: 'pop-chart-container',
                                                 collection: hours,
                                                 wait: false
                }));
            });

            Air.map.on('popupclose', function() {
                _.each(popupcharts, function(view) {
                    view.remove();
                });
            });

            // detect when window has finished resizing
            $(window).resize(function() {
                if (this.resizeTo) clearTimeout(this.resizeTo);
                // end of resize; trigger eresize event
                this.resizeTo = setTimeout(function() {
                    $(this).trigger('resizeEnd');

                    // also close map popup
                    Air.map.closePopup();
                }, 300);
            });

            hours.fetch({reset: true});
        },

    });

})();
