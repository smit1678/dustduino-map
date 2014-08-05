/*global Air, $*/


window.Air = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        Air.router = new Air.Routers.App();
        Backbone.history.start();
    }
};

$(document).ready(function () {
    'use strict';
    Air.init();
});
