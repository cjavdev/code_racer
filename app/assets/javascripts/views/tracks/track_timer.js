CodeRacer.Views.TrackTimer = Backbone.View.extend({
  initialize: function (options) {
    this.timer = options.timer;
    this.track = options.track;

    this.renderInterval = setInterval(this.render.bind(this), 500);
  },

  template: JST['tracks/timer'],

  wpm: function () {
    if(this.timer.countDown === false && this.timer.seconds > 1) {
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
