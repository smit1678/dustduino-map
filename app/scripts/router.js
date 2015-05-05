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
            'overview'                          : 'overview',
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

        overview: function() {
            Air.header.select('overview');

            var html = _.template(JST['app/scripts/templates/overview.ejs']({
                name: 'sensor',
                overview: Air.t.overview,
                banner: Air.img.path + Air.img.overview + Air._getSize(),
                tagline: Air.t.tagline,
                description: Air.t.description,
            }));
            this.$container.html(html);
        },


        search: function() {
            Air.header.select('search');

            // Init search and map views, so we show something
            // while the data queries.

            var id = 'sensor-search';
            var html = _.template(JST['app/scripts/templates/search.ejs']({
                id: id
            }));
            this.$container.html(html);

            var sensors = new Air.Collections.Sensors();

            var search = new Air.Views.Search({
                id: id,
                el: $('#' + id),
                collection: sensors
            });

            var map = new Air.Views.Map({
                id: 'search-map',
                collection: sensors
            });

            sensors.fetch({
                reset: true,
                success: function(collection) {
                    console.log(collection);
                }
            });

            views.push(search);
            views.push(map);
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

        // generate an report for a single sensor's data
        report: function(id) {
            // if no argument, show all sensors for now
            if (id == undefined || isNaN(id))  { this.reroute(); }

            var sensors = new Air.Collections.Sensors();
            sensors.url += id;
            sensors.fetch({
                success: function(collection, resp) {

                    var model = collection.at(0);
                    var html = _.template(JST['app/scripts/templates/report.ejs'](model.attributes));
                    this.$container.html(html);

                    var readings = new Air.Collections.Readings({ id: id });
                    views.push(new Air.Views.Table({
                        el: $('#report-table'),
                        collection: readings
                    }));
                    views.push(new Air.Views.Chart({
                        el: $('#report-chart'),
                        collection: readings,
                        height: 176,
                        resize: true,
                        id: 'report-chart'
                    }));
                    readings.fetch({ reset: true });
                }.bind(this)
            });
        },

        // default catch-all route
        reroute: function() {
            this.navigate('overview', {trigger:true});
        },
    });

})();
