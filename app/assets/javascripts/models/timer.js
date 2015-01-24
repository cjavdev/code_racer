CodeRacer.Models.Timer = Backbone.Model.extend({
  initialize: function () {
    this.seconds = 10;
    this.countDown = true;
    this.tickInterval = setInterval(this.tick.bind(this), 100);
  },

  startAt: function (time) {
    this.startTime = time;
    if (this.startTime > new Date()) {
      this.countDown = true;
      this.seconds = Math.abs((new Date() - time) / 1000);
    } else {
      this.countDown = false;
      this.seconds = Math.abs((new Date() + time) / 1000);
    }
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
