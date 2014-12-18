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

this["JST"]["app/scripts/templates/tooltip.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="popup-template">\n    <div class="container">\n        <div class="row">\n            <h3 class="col-sm-12">' +
((__t = ( place )) == null ? '' : __t) +
'</h3>\n            <div class="col-sm-12 col-lg-4 pop-image">\n                <img src="' +
((__t = ( src )) == null ? '' : __t) +
'" />\n            </div>\n            <div class="col-sm-12 col-lg-8 pop-chart">\n                <div class="desktop">\n                    <p><strong>Score: </strong> ' +
((__t = ( score )) == null ? '' : __t) +
'</p>\n                    <p><strong>Description</strong> Life was long, unless you died, and he didn’t intend to spend the next sixty years talking about the last twenty-two</p>\n                </div>\n                <div class="mask" id="pop-chart-container" style="height:120px;"></div>\n            </div>\n        </div>\n    </div>\n</div>\n';

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
        }, 100);
    });

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
            'overview/all'                      : 'all',
            'overview/:sensor'                  : 'one',
            'report/:sensor'                    : 'report',
            // default route
            '*action'                           : 'reroute'
        },

        // before calling each route's callback,
        // clean up it's views
        execute: function(callback, args) {
            clean();
            if (callback) callback.apply(this, args);
        },

        all: function() {
        },

        // generate an overview for a single sensor's data
        one: function(sensorName) {
            // if no argument, show all sensors for now
            if (!sensorName) this.reroute();
            var pageSize = 144;
            var collection = new Air.Collections.Sensor();

            // create a new instance of a location model,
            // which will query this sensor's location and create the map on success

            // var location = new Air.Models.User();
            // location.fetch({
            // success: function() {
            views.push(new Air.Views.Map({
                locations: [[-23.6824124,-46.5952992]],
                $parent: this.$container,
                id: 'single-sensor-map',
                className: 'map-container peek-map',
            }));
            // });

            // switch el to container
            views.push(new Air.Views.Chart({
                el: this.$container,
                id: 'air',
                collection: collection
            }));

            collection.fetch({
                data: {sensor: sensorName, hours: pageSize, format: 'json'},
                reset: true,
            });
        },

        report: function() {
        },

        // default catch-all route
        reroute: function() {
            this.navigate('overview/all', {trigger:true});
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
        url: 'http://thawing-cove-4522.herokuapp.com/api/readings/',


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

/*global Air, Backbone, JST*/

Air.Views = Air.Views || {};

(function () {
    'use strict';

    Air.Views.Map = Backbone.View.extend({

        initialize: function (options) {
            var $el = $('<div />', {
                id: options.id,
                class: options.className
            });
            options.$parent.append($el);
            this.setElement($el);

            var map = this.map = L.mapbox.map(options.id, 'devseed.j586d1hp');

            // Set location of the map.
            // If it's a single point, center on the point.
            // If multiple points, use map.fitBounds.
            var locations = options.locations;
            if (locations.length > 1) {
                map.fitBounds(locations);
            } else {
                map.setView(locations[0], 11);
            }

            var markerLayer = L.layerGroup(_.map(locations, function(location) {
                return L.circleMarker(location, { className: 'circle-marker' });
            }));

            this.markers = markerLayer;

            setTimeout(function() {
                markerLayer.addTo(map);
            }, 900);
        },

        // attach a click handler and open tooltips on click
        addClickHandler: function() {

            var popup = L.popup({
                closeOnClick: false,
                className: 'map-pop',
                autoPanPaddingTopLeft: [0, 70]
            });

            var content = JST['app/script/templates/tooltip.ejs'],
                map = this.map;

            this.points.on('click', function(d) {
                var coords = map.layerPointToLatLng([d.x, d.y]);
                popup.setLatLng(coords).setContent(content({
                    place: d.properties.name,
                    src: 'images/fake-station.jpg',
                    score: '40 - poor'
                })).openOn(map);
            });
        },

    });

})();

/*global Air, Backbone, JST*/

Air.Views = Air.Views || {};

(function () {
    'use strict';

    Air.Views.Chart = Backbone.View.extend({

        events: {},
        initialize: function (options) {
            $(window).bind('resizeEnd', $.proxy(this.resizeHandler, this));
            this.listenTo(this.collection, 'reset', this.render);
            this.listenTo(this.collection, 'error', this.errorHandler);
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

        render: function () {

            var hours = this.collection.length,
                days = hours / 24,
                margin = this.margin = [15, 15, 20, 15],
                width = this.width = this.$el.width() * days - margin[1] - margin[3],
                height = 120 - margin[0] - margin[2];


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

            //var max = d3.max(valid);
            var max = 100;

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


    });

})();
