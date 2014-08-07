/*global Air, Backbone, JST*/

Air.Views = Air.Views || {};

(function () {
    'use strict';

    Air.Views.Localtime = Backbone.View.extend({
        events: {},
        template: _.template('<h3 class="local"><%= local %></h3> <label class="gray">last updated <%= last %></label>'),
        initialize: function () {
            this.render();
        },

        render: function () {
            var $el = this.$el,
                UTC = new Date(),
                minutes = UTC.getUTCMinutes(),
                hours = UTC.getUTCHours() - 3;

            if (hours < 0) {
                hours = 24 - hours;
            }

            if (minutes < 10) {
                minutes = '0' + minutes;
            }

            $el.html(this.template({

                local: hours + ':' + minutes,
                last: hours + ':00'

            }));

            var local = this.$('.local');

            window.setInterval(function() {
                minutes += 1;
                if (minutes === 61) {
                    minutes = '00';
                    hours = hours === 23 ? 0 : hours + 1;
                }
                else if (minutes < 10) {
                    minutes = '0' + minutes;
                }
                local.html(hours + ':' + minutes)
            }, 6000);

        }

    });

})();
