/*global Air, Backbone, JST*/

Air.Views = Air.Views || {};

(function () {
    'use strict';

    Air.Views.Map = Backbone.View.extend({

        events: {},
        initialize: function () {

            //devseed.j586d1hp

            //Air.map = Air.map || L.mapbox.map(this.id, 'devseed.j586d1hp')
            Air.map = Air.map || L.mapbox.map(this.id, 'jue.hk00hb9l')
                .setView([-23.611, -46.715], 10);


            //app.map = app.map || L.mapbox.map('map', 'jue.hk00hb9l').setView([41.671, -88.899], 8);


        },

        render: function () {
        }

    });

})();
