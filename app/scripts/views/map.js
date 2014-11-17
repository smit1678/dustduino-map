/*global Air, Backbone, JST*/

Air.Views = Air.Views || {};

(function () {
    'use strict';

    Air.Views.Map = Backbone.View.extend({

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);

            var reset = $.proxy(this.resetSvg, this);
            Air.map.on('viewreset', reset);
        },

        render: function() {
            var transform = d3.geo.transform({point: function(x, y) {
                var point = Air.map.latLngToLayerPoint([y, x]);
                this.stream.point(point.x, point.y);
            }});

            var max = d3.max(_.map(this.model.get('features'), function(feature) {
                return feature.properties['pm_2.5'];
            }));

            this.popup = L.popup({
                closeOnClick: false,
                className: 'map-pop',
                autoPanPaddingTopLeft: [0, 70]
            });

            this.r = d3.scale.quantize()
                .domain([0, max])
                .range([10, 30, 50]);

            this.path = d3.geo.path().projection(transform);

            this.svg = d3.select(Air.map.getPanes().overlayPane)
                .append('svg:svg');

            this.g = this.svg.append('svg:g').attr('class', 'leaflet-zoom-hide');

            var click = $.proxy(this.click, this);
            this.points = this.g.selectAll('.station')
                .data(this.model.get('features'))
              .enter().append('circle')
                .attr('class', 'station')
                .attr('r', 0)
                .on('click', click);

            this.resetSvg();
        },

        template: _.template($('#popup-template').html()),

        click: function(d) {
            var coords = Air.map.layerPointToLatLng([d.x, d.y]);
            this.popup.setLatLng(coords).setContent(this.template({

                place: d.properties.name,
                src: 'images/fake-station.jpg'

            })).openOn(Air.map);
        },

        translatePoint: function(d) {
            var coords = d.geometry.coordinates,
                point = Air.map.latLngToLayerPoint(new L.latLng([coords[1], coords[0]]));
            return 'translate(' + point.x + ',' + point.y + ')';
        },

        getPoint: function(d) {
            var coords = d.geometry.coordinates,
                point = Air.map.latLngToLayerPoint(new L.latLng([coords[1], coords[0]]));
            return point
        },

        resetSvg: function() {

            var bounds = this.path.bounds(this.model.attributes),
                topLeft = bounds[0],
                bottomRight = bounds[1];

            this.svg.attr("width", bottomRight[0] - topLeft[0] + 100)
                .attr("height", bottomRight[1] - topLeft[1] + 100)
                .style("left", topLeft[0]-50 + "px")
                .style("top", topLeft[1]-50 + "px");

            var transform = [-topLeft[0] + 50, -topLeft[1] + 50];
            this.g.attr("transform", "translate(" + transform[0] + "," + transform[1] + ")");

            var features = this.model.get('features'),
                points = [];

            for(var i = 0, ii = features.length; i < ii; ++i) {
                points.push(this.getPoint(features[i]));
            }

            this.points
                .attr('cx', function(d, i) { d.x = points[i].x; return d.x; })
                .attr('cy', function(d, i) { d.y = points[i].y; return d.y });

            var r = this.r;
            this.points.transition()
                .delay(function(d, i) { return 600 + i * 200 })
                .duration(600)
                .attr('r', function(d) { return r(d.properties['pm_2.5'])});
        },
    });

})();
