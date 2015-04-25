/*global Air, Backbone, L*/

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
            'search'                            : 'search',
            'report/:sensor'                    : 'report',
            'manage'                            : 'edit',
            // default route
            '*action'                           : 'reroute'
        },

        // before calling each route's callback,
        // clean up it's views
        execute: function(callback, args) {
            clean();
            this.$container.empty();
            if (callback) {callback.apply(this, args);}
        },

        search: function() {
            // TODO should execute on success of fetch on sensor list
            Air.header.select('search');
            var id = 'sensor-search';
            var html = _.template(JST['app/scripts/templates/search.ejs']({
                id: id
            }));
            this.$container.html(html);

            views.push(new Air.Views.Search({
                id: id,
                el: $('#' + id)
            }));

            // falsifying data, use for development purposes only!
            var collection = new Air.Collections.Sensor();
            collection.fakeTrigger();
            views.push(new Air.Views.Map({
                locations: [[-23.6824124,-46.5952992]],
                collection: collection,
                id: 'search-map',
            }));
        },

        edit: function() {
            // TODO should execute on success of fetch on sensor list
            var id = 'sensor-edit';
            var html = _.template(JST['app/scripts/templates/edit.ejs']({
                id: id
            }));
            this.$container.html(html);

            views.push(new Air.Views.Edit({
                id: id,
                el: $('#' + id)
            }));

        },

        // generate an overview for a single sensor's data
        report: function(sensorName) {
            // if no argument, show all sensors for now
            if (!sensorName)  { this.reroute(); }

            var pageSize = 144;
            var collection = new Air.Collections.Sensor();

            var html = _.template(JST['app/scripts/templates/report.ejs']({
                name: 'Sensor #123',
                location: 'Bus Stop at 780 Fake Road',
                src: 'images/fake-station.jpg',
                id: 'report'
            }));
            this.$container.html(html);

            collection.fakeTrigger();
            var $table = $('#report-table');
            views.push(new Air.Views.Table({
                el: $table,
                collection: collection,
                render: true
            }));

            views.push(new Air.Views.Chart({
                collection: collection,
                el: $('#report-chart'),
                id: 'report-chart',
                render: true,
                height: 176,
            }));

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

            /*
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
            */
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
