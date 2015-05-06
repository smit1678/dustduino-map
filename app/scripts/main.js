/*global Air, $*/
'use strict';

(function() {
    window.Air = {
        api: 'http://brazil-sensor.herokuapp.com/api/v1',
        Models: {},
        Collections: {},
        Views: {},
        Routers: {},
        init: function () {

            $('#header-join').leanModal({ top : 200, overlay : 0.5, closeButton: '.modal-close' });

            $('.modal-close').on('click', function(e) {
            	e.preventDefault();
            	return false;
            });

            Air.header = new Air.Views.Header({ el: $('#header-options') });

            Air.router = new Air.Routers.App();
            Air.router.$container = $('#air');
            Backbone.history.start();
        }
    };
})();

$(document).ready(function () {

    // Throttle the window.resize event to fire after resize is finished.
    var $window = $(window);
    $window.resize(function() {
      if (this.resizeTo) { clearTimeout(this.resizeTo); }        // end of resize; trigger resize event
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
    };

    // TODO replace with correct language based on browser location
    Air.t = t.en;
    Air.img = img;

    Air.init();

});
