this["JST"] = this["JST"] || {};

this["JST"]["app/scripts/templates/deck.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="deck">\n    <div class="container">\n        <div class="row">\n\n            <div class="col-sm-6 col-lg-2 deck-hat">\n                <h3 class="gray">Local Time</h3>\n                <div id="local-time"></div>\n            </div>\n\n            <div class="col-sm-6 col-lg-2" id="scorecard">\n                <h3 class="gray deck-hat">Condition now</h3>\n                <h3 id="condition-now" class="phosphorescent"></h3>\n            </div>\n\n            <div class="col-sm-1 col-lg-1 desktop deck-hat">\n                <div id="hourly-yaxis">\n                    <span id="hourly-max"></span>\n                    <span id="hourly-mid"></span>\n                    <span id="hourly-min"></span>\n                </div>\n            </div>\n            <div class="col-sm-12 col-lg-7 desktop deck-hat">\n                <h3 class="gray">Hourly Conditions <label>(drag to show more)<label></h3>\n                <div id="hourly-chart" class="mask"></div>\n            </div>\n\n        </div>\n    </div>\n</div>\n\n';

}
return __p
};

this["JST"]["app/scripts/templates/modal.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="modal" id="initial-modal">\n    <div class="in-modal">\n        <p>Remote sensors in 40 locations relay hourly data on the quality of air in <span class="orange">São Paulo</span>, a city of 11.3 million residents.</p>\n        <span class="close">&#10006;</span>\n    </div>\n</div>\n';

}
return __p
};

this["JST"]["app/scripts/templates/overview.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="' +
((__t = ( name )) == null ? '' : __t) +
'-map" class="teaser-map"></div>\n\n<div class="container">\n    <div class="row">\n        <div class="col-lg-8 col-lg-offset-1 content-block">\n            <p id="section-join">' +
((__t = ( overview )) == null ? '' : __t) +
'</p>\n        </div>\n    </div>\n</div>\n\n<div class="banner">\n    <div class="banner-img" role="presentation" style="background: url(../' +
((__t = ( banner )) == null ? '' : __t) +
') no-repeat center center; background-size: cover;"></div>\n    <div class="container overlay">\n        <div class="row">\n            <div class="col-lg-6 col-lg-offset-3 inverted" style="opacity: .85">\n                <p><strong>' +
((__t = ( tagline )) == null ? '' : __t) +
'</strong> ' +
((__t = ( description )) == null ? '' : __t) +
' <a>Start creating your data.</a></p>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class="container">\n    <div class="row">\n        <div class="col-lg-8 col-lg-offset-1 content-block">\n            <p>Particulate matter (PM) is an air pollution term for a mixture of solid particles and liquid droplets found in the air. The pollutant comes in a variety of sizes and can be composed of many types of materials and chemicals. Particles that are small enough to be inhaled have the potential to cause health effects. Of particular concern is a class of particles known as fine particulate matter or PM2.5 that gets deep into the lung.</p>\n            <p>Inhalable particles, particularly fine particles, have the greatest demonstrated impact on human health. Their small size allows them to get deep into the lungs and from there they can reach or trigger inflammation in the lung, blood vessels or the heart, and perhaps other organs. Studies have linked PM exposure to health problems, including some cancers.</p>\n            <p>For more on particulate matter health concerns, see the <a href="http://whqlibdoc.who.int/hq/2006/WHO_SDE_PHE_OEH_06.02_eng.pdf?ua=1">WHO report</a>.</p>\n        </div>\n    </div>\n</div>\n';

}
return __p
};

this["JST"]["app/scripts/templates/report.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="container report">\n    <div class="row">\n        <div class="col-sm-12 col-md-4 col-lg-3 col-lg-offset-1 pop-image">\n            <img src="' +
((__t = ( src )) == null ? '' : __t) +
'" />\n        </div>\n        <div class="col-sm-12 col-md-8 col-lg-7 pop-chart">\n            <h3 class="tooltip-sensor-name" id="' +
((__t = ( id )) == null ? '' : __t) +
'-pop">' +
((__t = ( name )) == null ? '' : __t) +
'</h3>\n            <div class="desktop">\n                <p><strong>Location: </strong> ' +
((__t = ( location )) == null ? '' : __t) +
'</p>\n            </div>\n            <div class="mask" id="' +
((__t = ( id )) == null ? '' : __t) +
'-chart"></div>\n        </div>\n    </div>\n\n    <div class="row" style="margin-top: 1em;">\n        <div class="co-sm-12 col-lg-10 col-lg-offset-1">\n            <div id="report-table"></div>\n        </div>\n    </div>\n</div>\n\n';

}
return __p
};

this["JST"]["app/scripts/templates/search.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="container main-input" id="' +
((__t = ( id )) == null ? '' : __t) +
'">\n    <div class="row">\n        <div class="col-sm-12 col-md-8 col-md-offset-2">\n            <label>Search for a sensor by name or ID, or locate it on the map</label>\n            <form>\n                <input type="text" class="search-input">\n                <input type="submit" class="search-submit" value="search"></input>\n            </form>\n        </div>\n    </div>\n</div>\n<div class="half-map" id="search-map"></div>\n';

}
return __p
};

this["JST"]["app/scripts/templates/table.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<table class="table-full">\n    <thead><tr>\n        ';
 _.each(tableHeaders, function(hed) { ;
__p += '\n            <td>' +
__e( hed ) +
'</td>\n        ';
 }); ;
__p += '\n    </tr></thead>\n    <tbody>\n        ' +
((__t = ( tableContent )) == null ? '' : __t) +
'\n    </tbody>\n</table>\n';

}
return __p
};

this["JST"]["app/scripts/templates/tooltip.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="map-pop">\n    <div class="row">\n        <div class="col-sm-12 col-lg-4 pop-image">\n            <img src="' +
((__t = ( src )) == null ? '' : __t) +
'" />\n        </div>\n        <div class="col-sm-12 col-lg-8 pop-chart">\n            <h3 class="tooltip-sensor-name" id="' +
((__t = ( id )) == null ? '' : __t) +
'-pop">' +
((__t = ( name )) == null ? '' : __t) +
'</h3>\n            <div class="desktop">\n                <p><strong>Location: </strong> ' +
((__t = ( location )) == null ? '' : __t) +
'</p>\n                <p><a>Generate report</a></p>\n            </div>\n            <div class="mask" id="' +
((__t = ( id )) == null ? '' : __t) +
'-chart" style="height:120px;"></div>\n        </div>\n    </div>\n</div>\n';

}
return __p
};
/*global Air, $*/
;'use strict';

(function() {
    window.Air = {
        Models: {},
        Collections: {},
        Views: {},
        Routers: {},
        init: function () {
            'use strict';

            Air.header = new Air.Views.Header({ el: $('#header-options') });

            Air.router = new Air.Routers.App();
            Air.router.$container = $('#air');
            Backbone.history.start();
        }
    };
})();

$(document).ready(function () {
    'use strict';

    // Throttle the window.resize event to fire after resize is finished.
    var $window = $(window);
    $window.resize(function() {
        if (this.resizeTo) clearTimeout(this.resizeTo);
        // end of resize; trigger resize event
        this.resizeTo = setTimeout(function() {
            $window.trigger('resizeEnd');
            // also close map popup
            // Air.map.closePopup();
        }, 300);
    });

    Air._getSize = function() {
        var width = $window.width();
        return width > 1400 ? '2400.jpg' :
            width > 600 ? '1200.jpg' : '480.jpg';
    };

    // text object for copy
    var t = {
        en: {
            overview: 'The São Paulo Dustduino project connects makers and electronics hackers with civic-minded citizens and journalists to create better data on air quality. Scroll down to see how &#x261F;.',
            tagline: 'Better data makes better policy.',
            description: 'When citizens create data about their environment, they are better equipped to advocate for more health-conscious emissions policies.',

        },
        sp: {},
    };

    // relative image paths
    var img = {
        path: 'images/',
        overview: 'banner/dustduino_',
    }

    // TODO replace with correct language based on browser location
    Air.t = t.en;
    Air.img = img;

    Air.init();

});

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
            'search'                            : 'search',
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

        // generate an overview for a single sensor's data
        report: function(sensorName) {
            // if no argument, show all sensors for now
            if (!sensorName) this.reroute();

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

            // falsifying data, use for development purposes only!
            collection.fakeTrigger();
            views.push(new Air.Views.Map({
                locations: [[-23.6824124,-46.5952992]],
                collection: collection,
                id: 'sensor-map',
            }));
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

/*global Air, Backbone*/

Air.Models = Air.Models || {};

(function () {
    'use strict';
    Air.Models.Reading = Backbone.Model.extend({
        defaults: {
            created: null,
            owner: null,
            pm10: null,
            pm10_reading: null,
            pm25: null,
            pm25_reading: null
        },
    });
})();

/*global Air, Backbone*/

Air.Collections = Air.Collections || {};

(function () {
    'use strict';

    // collection file for a single sensor
    Air.Collections.Sensor = Backbone.Collection.extend({
        model: Air.Models.Reading,
        //url: 'http://thawing-cove-4522.herokuapp.com/api/readings/',

        // fake function to mock a real collection
        // development purposes only
        fakeTrigger: function() {
            var hours = 72,
                records = [],
                i = 0;

            for(; i < hours; ++i) {
                records.push({
                    owner: 'arduino',
                    created: i,
                    pm10_reading: Math.round(Math.random() * 500),
                    pm25_reading: Math.round(Math.random() * 500),
                    pm10: Math.round(Math.random() * 100),
                    pm25: Math.round(Math.random() * 100),
                });
            }

            this.reset(records);
        },
    });
})();

/*global Air, Backbone, JST*/

Air.Views = Air.Views || {};

(function () {
    'use strict';

    Air.Views.Table = Backbone.View.extend({

        initialize: function(options) {

            if (options.render) {
                this.render();
            }
            else if (this.collection) {
                this.listenTo(this.collection, 'reset', this.render);
            }

        },

        template: JST['app/scripts/templates/table.ejs'],

        render: function() {

            var models = this.collection.models,
                i = 0, ii = models.length;

            var headers = ['created', 'pm10', 'pm10_reading', 'pm25', 'pm25_reading'];

            var table = [];
            for(; i < ii; ++i) {
                table.push(_.map(headers, function(hed) {
                    return '<td>' + models[i].attributes[hed] + '</td>';
                }).join(''));
            };

            this.$el.html(this.template({
                tableHeaders: headers,
                tableContent: '<tr>' + table.join('</tr><tr>') + '</tr>'
            }));
        },

    });

})();

/*global Air, Backbone, JST*/

Air.Views = Air.Views || {};

(function () {
    'use strict';

    Air.Views.Modal = Backbone.View.extend({
        events: { 'click .close': 'close' },
        initialize: function() {
            var close = $.proxy(this.close, this);
            $('body').one('click', close);
        },

        close: function() {
            var $this = this.$el;
            $this.fadeOut(200, function() {
                $this.remove();
            });
        }
    });

})();

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

/*global Air, Backbone, JST*/

Air.Views = Air.Views || {};

(function () {
    'use strict';

    Air.Views.Map = Backbone.View.extend({

        initialize: function (options) {
            var $el = $('#' + options.id);
            this.setElement($el);

            //var map = this.map = L.mapbox.map(options.id/*, 'devseed.j586d1hp'*/);
            var map = this.map = L.mapbox.map(options.id, 'devseed.j586d1hp');
            map.scrollWheelZoom.disable();

            // Set location of the map.
            // If it's a single point, center on the point.
            // If multiple points, use map.fitBounds.
            var locations = options.locations;
            if (locations.length > 1) {
                map.fitBounds(locations);
            } else {
                map.setView(locations[0], 11);
            }

            var popupContent = JST['app/scripts/templates/tooltip.ejs'];
            var markerLayer = L.layerGroup(_.map(locations, function(location) {
                return L.marker(location, {
                    icon: L.icon({
                        iconUrl: '/images/transmit_36.png',
                        iconSize: [36,36],
                        className: 'icon-marker',
                    })
                }).bindPopup(popupContent({
                    // TODO replace with data from model
                    name: 'Sensor #123',
                    location: 'Bus Stop at 780 Fake Road',
                    src: 'images/fake-station.jpg',
                    id: options.id,
                }, { offset: [12,0] }));
            }));

            // using icon markers, but leaving this in case we want to switch back
            // var markerLayer = L.layerGroup(_.map(locations, function(location) {
                // return L.circleMarker(location, { className: 'circle-marker' });
            // }));

            this.markers = markerLayer;

            setTimeout(function() {
                markerLayer.addTo(map);
            }, 600);

            map.on('popupopen', this.popopen.bind(this));
            map.on('popupclose', this.popclose.bind(this));

            this.popups = [];

            return;
        },

        popopen: function() {
            var $pop = this.$('.map-pop'),
                $container = $pop.find('#' + this.id + '-chart'),
                name = $pop.find('#' + this.id + '-pop').text();

            this.popups.push(new Air.Views.Chart({
                collection: this.collection,
                el: $container,
                id: this.id + '-chart',
                render: true,
            }));

        },

        popclose: function() {
            _.each(this.popups, function(popup) {
                popup.remove();
            });
            this.popups = [];
        }

    });

})();

/*global Air, Backbone, JST*/

Air.Views = Air.Views || {};

(function () {
    'use strict';

    // simple bar chart taking two sets of variables
    Air.Views.Chart = Backbone.View.extend({

        events: {},
        initialize: function (options) {

            this.height = options.height || 120;

            if (options.resize) {
                $(window).bind('resizeEnd', $.proxy(this.resizeHandler, this));
            }

            if (options.handleErrors) {
                this.listenTo(this.collection, 'error', this.errorHandler);
            }

            if (options.render) {
                this.render();
            } else if (this.collection) {
                this.listenTo(this.collection, 'reset', this.render);
            }
        },

        render: function () {

            var hours = this.collection.length,
                days = hours / 24,
                margin = this.margin = [15, 15, 20, 15],
                width = this.width = this.$el.width() * days - margin[1] - margin[3],
                height = this.height - margin[0] - margin[2];

            this.$el.css('height', height + margin[0] + margin[2]);

            //*********** drag **************
            this.pos = 0;
            this.nextpos = 0;
            this.limit = -width / days * (days - 1) - 50;
            var drag = d3.behavior.drag()
                .on('drag', this.dragmove.bind(this))
                .on('dragend', this.dragend.bind(this));


            //*********** init **************
            var base = this.base = d3.select('#' + this.id).append('svg:svg')
                .attr('width', width + margin[1] + margin[3])
                .attr('height', height + margin[0] + margin[2])
                .attr('class', 'slider drag')
                .call(drag);

            var svg = base.append('g')
                .attr('class', 'bar-chart')
                .attr('transform', 'translate(' + margin[3] + ',' + margin[0] + ')')

            var valid = _.filter(this.collection.pluck('pm10_reading').concat(this.collection.pluck('pm25_reading')),
                                 function(reading) { return reading !== null });

            var max = d3.max(valid);

            var x = this.x = d3.scale.linear()
                .domain([0, hours])
                .range([0, width]);

            var y = d3.scale.linear()
                .range([height, 0])
                .domain([0, max]);

            var dblWidth = x(1) - x(0),
                barWidth = Math.floor(dblWidth / 2) - 2;

            if (barWidth < 0) barWidth = Math.floor(dblWidth / 2) || 1;

            //*********** axis **************

            var ticks = [];
            _.each(this.collection.models, function(model, i) {
                if (model.attributes.hour % 6 === 0) {
                    ticks.push({hour: model.attributes.hour + ':00' , index: i});
                }
            });

            this.xAxis = base.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(' + margin[3] + ',' + (height + margin[0]) + ')')
                .selectAll('.tick')
                .data(ticks)
              .enter().append('text')
                .attr('class', 'tick')
                .attr('text-anchor', 'middle')
                .attr('transform', function(d) {
                    return 'translate(' + x(d.index) + ',14)'
                })
                .text(function(d) { return d.hour });

            /*
            $('#hourly-max').html(Math.ceil(max) + ' &ndash;');
            $('#hourly-mid').html(Math.ceil(max / 2) + ' &ndash;');
            $('#hourly-min').html('0 &ndash;');
            */

            //*********** tips **************

            var template = _.template('<h3><%= date %></h3><p>PM 2.5: <%= pm25 %><br />PM10: <%= pm10 %></p>');

            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .html(function(d) {
                    return template({
                        date: ['August', d.get('day'), d.get('hour') + ':00'].join(' '),
                        pm25: d.get('pm25'),
                        pm10: d.get('pm10')
                    });
                });

            svg.call(tip);

            //*********** bars **************

            var pm25 = svg.selectAll('.pm25')
                .data(this.collection.models)
              .enter().append('rect')
                .attr('class', 'pm25')
                .attr('x', function(d, i) { return x(i) - barWidth })
                .attr('y', height)
                .attr('width', barWidth)
                .attr('height', 0)
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide);

            var pm10 = svg.selectAll('.pm10')
                .data(this.collection.models)
              .enter().append('rect')
                .attr('class', 'pm10')
                .attr('x', function(d, i) { return x(i) })
                .attr('y', height)
                .attr('width', barWidth)
                .attr('height', 0)
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide);

            pm25.transition()
                .duration(200)
                .delay(function(d, i) { return (hours - i) * 30 })
                .attr('y', function(d) { return y(d.get('pm25_reading'))})
                .attr('height', function(d) { return height - y(d.get('pm25_reading'))});

            pm10.transition()
                .duration(200)
                .delay(function(d, i) { return (hours - i) * 30 })
                .attr('y', function(d) { return y(d.get('pm10_reading'))})
                .attr('height', function(d) { return height - y(d.get('pm10_reading'))});

            this.bars = [pm25, pm10];
        },

        dragmove: function() {
            this.pos -= d3.event.dx;
            if (this.pos < this.limit || this.pos > 20) {
                this.bounceBack = true;
            }
            else {
                this.lastpos = this.pos;
            }
            this.base.style('right', this.pos + 'px');
        },

        dragend: function() {
            if (this.bounceBack) {
                this.bounceBack = false;
                this.pos = this.lastpos;
                this.base.transition()
                    .duration(200)
                    .style('right', this.pos + 'px')
            }
        },

        resizeHandler: function() {
            this.$el.fadeOut(150, function() {
                this.resize();
                this.$el.fadeIn(250);
            }.bind(this));
        },

        errorHandler: function(collection, response, options) {
            console.log('model error', collection, response, options);
        },

        resize: function() {

            // if it's not showing, don't bother
            if (this.$el.is(':visible')) return;

            var days = this.collection.length / 24,
                width = this.$el.width() * days;

            this.x.range([0, width]);

            var x = this.x,
                dblWidth = x(2) - x(1),
                barWidth = Math.floor(dblWidth / 2) - 2;

            if (barWidth < 0) barWidth = Math.floor(dblWidth / 2) || 1;

            this.base//.transition()
                //.delay(100)
                .attr('width', width);

            this.bars[0]//.transition()
                //.duration(100)
                .attr('x', function(d, i) { return x(i) - barWidth })
                .attr('width', barWidth);

            this.bars[1]//.transition()
                //.duration(100)
                .attr('x', function (d, i) { return x(i) })
                .attr('width', barWidth);

            this.xAxis
                .attr('transform', function(d) {
                    return 'translate(' + x(d.index) + ',14)'
                })

            // calculate roughly where we were before
            this.pos = width * this.pos / this.width;
            this.base.style('right', this.pos + 'px');

            this.limit = -width / days * (days - 1) - 50;
            this.width = width;
        },

    });

})();

Air.Views = Air.Views || {};
(function () {
    'use strict';
    // just something to switch around our header selection
    Air.Views.Header = Backbone.View.extend({
        select: function(id) {
            this.$('.active').removeClass('active');
            this.$('#header-' + id).addClass('active');
        },
    });
})();
