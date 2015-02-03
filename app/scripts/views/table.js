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
