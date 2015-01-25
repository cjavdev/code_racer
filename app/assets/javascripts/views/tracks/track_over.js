/*globals CodeRacer, Backbone, JST, FB, window */
CodeRacer.Views.TrackOver = Backbone.View.extend({
  initialize: function (options) {
    this.wpm = options.wpm;
  },

  events: {
    'click button.facebook': 'shareOnFacebook',
    'click .backdrop': 'close'
  },

  close: function () {
    this.remove();
  },

  shareOnFacebook: function () {
    FB.ui({
      method: 'share',
      href: window.location.toString(),
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
