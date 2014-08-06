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

            this.path = d3.geo.path().projection(transform);

            this.svg = d3.select(Air.map.getPanes().overlayPane)
                .append('svg:svg');

            this.g = this.svg.append('svg:g').attr('class', 'leaflet-zoom-hide');

            this.points = this.g.selectAll('.station')
                .data(this.model.get('features'))
              .enter().append('circle')
                .attr('class', 'station')
                .attr('r', 0);

            this.resetSvg();
        },

        translatePoint: function(d) {
            var coords = d.geometry.coordinates,
                point = Air.map.latLngToLayerPoint(new L.latLng([coords[1], coords[0]]));
            return 'translate(' + point.x + ',' + point.y + ')';
        },

        resetSvg: function() {

            var bounds = this.path.bounds(this.model.attributes),
                topLeft = bounds[0],
                bottomRight = bounds[1];

            this.svg.attr("width", bottomRight[0] - topLeft[0] + 100)
                .attr("height", bottomRight[1] - topLeft[1] + 100)
                .style("left", topLeft[0]-50 + "px")
                .style("top", topLeft[1]-50 + "px");

            this.g.attr("transform", "translate(" + (-topLeft[0]+50) + "," + (-topLeft[1]+50)+ ")");

            this.points.attr('transform', this.translatePoint);

            this.points.transition()
                .delay(function(d, i) { return 600 + i * 200 })
                .duration(600)
                .attr('r', 15);
        },
    });

})();
