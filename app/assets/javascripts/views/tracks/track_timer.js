CodeRacer.Views.TrackTimer = Backbone.View.extend({
  initialize: function (options) {
    this.timer = options.timer;
    this.track = options.track;
    this.listenTo(this.timer, 'go', this.removeLoader);

    this.renderInterval = setInterval(this.renderStats.bind(this), 500);
  },

  renderStats: function () {
    if (this.timer.countDown) {
      this.$('.wpm').html("Get Ready!");
    } else {
      this.$('.wpm').html("<span class='label label-success'>" + this.wpm() + "</span> WPM");
    }
    this.$('.time').html(this.time());
  },

  removeLoader: function () {
    this.$('.loader').remove();
  },

  template: JST['tracks/timer'],

  wpm: function () {
    if (this.timer.countDown === false && this.timer.seconds > 1) {
      return (this.track.currentWordCount() / (this.timer.seconds / 60)).toFixed(2);
    }
    return 0;
  },

  time: function () {
    return this.timer.roundSeconds();
  },

  render: function () {
    var content = this.template({
      time: this.time(),
      timer: this.timer,
      wpm: this.wpm()
    });
    this.$el.html(content);
    return this;
  },
});
