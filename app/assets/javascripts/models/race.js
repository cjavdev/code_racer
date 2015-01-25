/*globals CodeRacer, _, Backbone */

CodeRacer.Models.Race = function (track, timer, wordChecker) {
  this.track = track;
  this.timer = timer;
  this.wordChecker = wordChecker;

  this.listenTo(track, 'change:content', function () {
    this.wordChecker.setContent(track.get('content'));
  });

  this.forwardEvents();

  track.fetch();
  track.join(timer);
};

CodeRacer.Models.Race.prototype = {
  forwardEvents: function () {
    this.listenTo(this.track, 'sync', function () {
      this.trigger('sync');
    });

    this.listenTo(this.timer, 'go', function () {
      this.trigger('go');
    });
  },

  cars: function () {
    return this.track.cars();
  },

  leaders: function () {
    return this.track.leaders();
  },

  content: function () {
    return this.wordChecker.render();
  },

  wpm: function () {
    if (this.timer.countDown === false && this.timer.seconds > 1) {
      return (this.wordChecker.currentWordCount() / (this.timer.seconds / 60)).toFixed(2);
    }
    return 0;
  },

  time: function () {
    return this.timer.roundSeconds();
  },
};

_.extend(CodeRacer.Models.Race.prototype, Backbone.Events);
