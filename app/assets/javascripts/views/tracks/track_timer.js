/*globals CodeRacer, JST, Backbone */
CodeRacer.Views.TrackTimer = Backbone.View.extend({
  template: JST['tracks/timer'],

  initialize: function (options) {
    this.race = options.race;
    this.timer = options.timer;
    this.track = options.track;

    this.listenTo(this.race, 'go', this.removeLoader);
    this.renderInterval = setInterval(this.renderStats.bind(this), 500);
  },

  renderStats: function () {
    this._renderWpm();
    this._renderTime();
  },

  removeLoader: function () {
    this.$('.loader').remove();
  },

  render: function () {
    var content = this.template({
      time: this.race.time(),
      timer: this.race.timer,
      wpm: this.race.wpm()
    });
    this.$el.html(content);
    return this;
  },

  _renderWpm: function () {
    if (this.timer.countDown) {
      this.$('.wpm').html("Get Ready!");
    } else {
      this.$('.wpm').html("<span class='label label-success'>" + this.race.wpm() + "</span> WPM");
    }
  },

  _renderTime: function () {
    this.$('.time').html(this.race.time());
  }
});
