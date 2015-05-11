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

            this.listenToOnce(this.collection, 'reset', this.render);
        },

        render: function () {

            var hours = this.collection.length,
                days = hours / 24,
                margin = this.margin = [10, 15, 45, 15],
                width = this.width = this.$el.width() * days - margin[1] - margin[3],
                height = this.height - margin[0] - margin[2];

            var input = d3.time.format('%Y%m%d%H');
            var output = d3.time.format('%H:00 %d/%m/%y');

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

            var valid = this.collection.pluck('pm10').concat(this.collection.pluck('pm25'));

            var max = d3.max(valid);

            var x = this.x = d3.scale.linear()
                .domain([0, hours])
                .range([width, 0]);

            var y = d3.scale.linear()
                .range([height, 0])
                .domain([0, max]);

            var dblWidth = x(0) - x(1),
                barWidth = Math.floor(dblWidth / 2) - 2;

            if (barWidth < 0) barWidth = Math.floor(dblWidth / 2) || 1;

            //*********** axis **************

            var ticks = [];
            this.collection.each(function(model, i) {
                var hour = model.get('hour_code');
                if (hour.slice(8) % 6 === 0) {
                    ticks.push({hour: output(input.parse(hour)) , index: i});
                }
            });

            this.xAxis = base.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(' + margin[3] + ',' + (height + margin[0]) + ')')
                .selectAll('.tick')
                .data(ticks)
              .enter().append('g')
                .attr('transform', function(d) {
                    return 'translate(' + x(d.index) + ',32)'
                })

            this.xAxis.append('text')
                .attr('class', 'tick')
                .attr('text-anchor', 'middle')
                .text(function(d) { return d.hour });

            this.xAxis.append('line')
                .attr('x1', 0)
                .attr('x2', 0)
                .attr('y1', -25)
                .attr('y2', -15)
                .style('stroke-width', 1)
                .style('stroke', '#666');

            /*
            $('#hourly-max').html(Math.ceil(max) + ' &ndash;');
            $('#hourly-mid').html(Math.ceil(max / 2) + ' &ndash;');
            $('#hourly-min').html('0 &ndash;');
            */

            //*********** tips **************

            var template = _.template('<h3><%= date %></h3><p>PM 2.5: <%= pm25 %><br />PM 10: <%= pm10 %></p>');

            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .html(function(model) {
                    return template({
                        date: output(input.parse(model.get('hour_code'))),
                        pm25: d3.round(model.get('pm25'), 2),
                        pm10: d3.round(model.get('pm10'), 2),
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
                .delay(function(d, i) { return (hours - i) * 10 })
                .attr('y', function(d) { return y(d.get('pm25'))})
                .attr('height', function(d) { return height - y(d.get('pm25'))});

            pm10.transition()
                .duration(200)
                .delay(function(d, i) { return (hours - i) * 10 })
                .attr('y', function(d) { return y(d.get('pm10'))})
                .attr('height', function(d) { return height - y(d.get('pm10'))});

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
                    return 'translate(' + x(d.index) + ',32)'
                })

            // calculate roughly where we were before
            this.pos = width * this.pos / this.width;
            this.base.style('right', this.pos + 'px');

            this.limit = -width / days * (days - 1) - 50;
            this.width = width;
        },

    });

})();
