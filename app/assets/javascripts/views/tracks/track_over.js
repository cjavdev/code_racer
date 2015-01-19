CodeRacer.Views.TrackOver = Backbone.View.extend({
  initialize: function (options) {
    this.wpm = options.wpm;
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


