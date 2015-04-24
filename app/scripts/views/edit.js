Air.Views = Air.Views || {};
(function () {
  'use strict';
  // just something to switch around our header selection
  Air.Views.Edit = Backbone.View.extend({
    events: {
      'submit form': 'submit'
    },

    initialize: function() {
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