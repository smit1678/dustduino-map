/*global Air, Backbone*/

Air.Routers = Air.Routers || {};

(function () {
    'use strict';

    // array of views to remove
    var views = [];
    function clean() {
        _.each(views, function(view) {
            view.remove();
        });
        views = [];
    }

    Air.Routers.App = Backbone.Router.extend({
        routes: {
            'overview'                          : 'all',
            'find'                              : 'find',
            'report/:sensor'                    : 'report',
            // default route
            '*action'                           : 'reroute'
        },

        // before calling each route's callback,
        // clean up it's views
        execute: function(callback, args) {
            clean();
            this.$container.empty();
            if (callback) callback.apply(this, args);
        },

        find: function() {
            Air.header.select('find');

            var html = _.template(JST['app/scripts/templates/find.ejs']({

            }));
            this.$container.html(html);

        },

        // generate an overview for a single sensor's data
        report: function(sensorName) {
            // if no argument, show all sensors for now
            if (!sensorName) this.reroute();

            var pageSize = 144;
            var collection = new Air.Collections.Sensor();

            var escaped = _.escape(sensorName);
            var html = _.template(JST['app/scripts/templates/overview.ejs']({
                name: escaped,
                overview: Air.t.overview,
                banner: Air.img.path + Air.img.overview + Air._getSize(),
                tagline: Air.t.tagline,
                description: Air.t.description,
            }));
            this.$container.html(html);
        },

        all: function() {
            Air.header.select('overview');

            var pageSize = 144;
            var collection = new Air.Collections.Sensor();

            var html = _.template(JST['app/scripts/templates/overview.ejs']({
                name: 'sensor',
                overview: Air.t.overview,
                banner: Air.img.path + Air.img.overview + Air._getSize(),
                tagline: Air.t.tagline,
                description: Air.t.description,
            }));
            this.$container.html(html);

            var header = new Air.Views.Header({ el: $('#header-options') });
            header.select('readings');
            views.push(header);

            collection.fetch({
                data: {sensor: 'sensor', hours: pageSize, format: 'json'},
                success: function() {
                    views.push(new Air.Views.Map({
                        locations: [[-23.6824124,-46.5952992]],
                        collection: collection,
                        id: 'sensor-map',
                    }));
                },
                reset: true,
            });
        },

        // default catch-all route
        reroute: function() {
            this.navigate('overview', {trigger:true});
        },

        map: function() {
            Air.map = Air.map || L.mapbox.map('paulo-map', 'devseed.j586d1hp')
                .setView([-23.557, -46.656], 11);
        },

            //************************** Views **************************//
            // $('.modal').each(function() { new Air.Views.Modal({el: '#' + this.id}); });
            // new Air.Views.Score({el: '#scorecard', id: 'scorecard', collection: hours});
            // new Air.Views.Chart({el: '#hourly-chart', id: 'hourly-chart',
                                // collection: hours, wait: true});
            // new Air.Views.Localtime({el: '#local-time', id:'local-time'});

            // Air.map.whenReady(function() {

                // new Air.Views.Map({el: '#paulo-map', id: 'paulo-map', model: stations});
                // stations.fetch({reset:true});

            // });

            // var popupcharts = [];

            // Air.map.on('popupopen', function() {
                // popupcharts.push(new Air.Views.Chart({el: '#pop-chart-container',
                                                 // id: 'pop-chart-container',
                                                 // collection: hours,
                                                 // wait: false
                // }));
            // });

            // Air.map.on('popupclose', function() {
                // _.each(popupcharts, function(view) {
                    // view.remove();
                // });
            // });
            // hours.fetch({reset: true});
    });

})();
