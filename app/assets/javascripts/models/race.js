/*globals CodeRacer, _, Backbone */
CodeRacer.Models.Race = function (track, timer, wordChecker) {
  this.track = track;
  this.timer = timer;
  this.wordChecker = wordChecker;
  this._valid = true;

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

    this.listenTo(this.wordChecker, 'over', function () {
      this.over();
    });

    this.listenTo(this.wordChecker, 'next', function () {
      this.next();
    });
  },

  over: function () {
    this.track.notify(this.wpm(), this.wordChecker.percentComplete(), true);
    this.timer.stop();
    this.trigger('over');
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

  checkWord: function (word) {
    this._valid = this.wordChecker.checkWord(word);
    return this._valid;
  },

  valid: function () {
    return this._valid;
  },

  wpm: function () {
    if (this.started() && this.timer.seconds > 1) {
      return (this.wordChecker.currentWordCount() / (this.timer.seconds / 60)).toFixed(2);
    }
    return 0;
  },

  time: function () {
    return this.timer.roundSeconds();
  },

  started: function () {
    return !this.timer.countDown;
  },

  next: function () {
    this.track.notify(this.wpm(), this.wordChecker.percentComplete());
    this.trigger('next');
  },
};

_.extend(CodeRacer.Models.Race.prototype, Backbone.Events);
