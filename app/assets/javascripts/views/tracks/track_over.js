CodeRacer.Views.TrackOver = Backbone.View.extend({
  initialize: function (options) {
    this.wpm = options.wpm;
  },

  events: {
    'click button': 'share',
    'click .backdrop': 'close'
  },

  close: function () {
    this.remove();
  },

  share: function () {
    FB.ui({
      method: 'share',
      href: window.location.toString(),
    }, function (response) {
      if (response && !response.error_code) {
        // alert('Posting completed.');
      } else {
        // alert('Error while posting.');
      }
    });
  },

  template: JST['tracks/over'],

  render: function () {
    var content = this.template({
      wpm: this.wpm
    });

    this.$el.html(content);
    return this;
  }
});
