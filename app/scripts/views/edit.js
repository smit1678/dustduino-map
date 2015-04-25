/*global L*/
Air.Views = Air.Views || {};
(function () {
  'use strict';
  // just something to switch around our header selection
  Air.Views.Edit = Backbone.View.extend({
    events: {
      'submit form': 'submit'
    },

    initialize: function() {
      // Initialize map
      L.mapbox.accessToken = 'pk.eyJ1Ijoia2FtaWN1dCIsImEiOiJMVzF2NThZIn0.WO0ArcIIzYVioen3HpfugQ';
      var map = L.mapbox.map('minimap', 'devseed.j586d1hp');

      var marker;

      // Map onload
      map.on('load', function() {
        var c = map.getCenter();
        marker = L.marker(c).addTo(map);
        this.$('input[name="latitude"]').val(c.lat);
        this.$('input[name="longitude"]').val(c.lng);
      }.bind(this));

      // Map onclick
      map.on('click', function(e) {
        this.$('input[name="latitude"]').val(e.latlng.lat);
        this.$('input[name="longitude"]').val(e.latlng.lng);
        marker.setLatLng(e.latlng);
        map.panTo(e.latlng);
      }.bind(this));

      // Cache id fields
      this.fields = ['longitude', 'latitude', 'description', 'email', 'arduino'];
      this.fields.forEach(function(field) {
        this['$' + field] = this.$('input[name="' + field + '"]');
      }.bind(this));

    },

    submit: function(e) {
      e.preventDefault();

      //Validate input
      var valid = true;
      this.fields.forEach(function(field) {
        valid = this['$' + field].val().length > 0 && valid;
      }.bind(this));

      // If valid, send a PUT request
      if (valid) {
        var data = {};
        this.fields.forEach(function(field) {
          data[field] = this['$' + field].val();
        });
        $.ajax({
          url: 'api.something',
          type: 'PUT',
          data: data,
          success: function() {
            console.log('success!');
          }
        });
      } else {
        console.log('Fields not valid.');
      }
    },
  });
})();