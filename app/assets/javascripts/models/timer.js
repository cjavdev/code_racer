CodeRacer.Models.Timer = Backbone.Model.extend({
  initialize: function () {
    this.seconds = 5;
    this.countDown = true;
    this.tickInterval = setInterval(this.tick.bind(this), 100);
  },

  stop: function () {
    clearInterval(this.tickInterval);
    return this.seconds;
  },

  roundSeconds: function () {
    return parseInt(this.seconds, 10);
  },

  tick: function () {
    if (this.seconds < 0.2) {
      this.trigger('go');
    }
    if (this.seconds > 0 && this.countDown) {
      this.seconds -= 0.1;
    } else {
      this.countDown = false;
      this.seconds += 0.1;
    }
  }
});
