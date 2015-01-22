CodeRacer.Models.Track = Backbone.Model.extend({
  urlRoot: '/api/tracks',

  currentWordCount: function () {
    return this.wordChecker().currentWordCount();
  },

  checkWord: function (word) {
    return this.wordChecker().checkWord(word);
  },

  checkLetter: function (letter) {
    return this.wordChecker().checkLetter(letter);
  },

  wordComplete: function (word) {
    return this.wordChecker().wordComplete(word);
  },

  backSpace: function () {
    return this.wordChecker().backSpace();
  },

  content: function () {
    return this.wordChecker().render();
  },

  moreWords: function () {
    return this.wordChecker().moreWords();
  },

  wordCount: function () {
    return this.wordChecker().wordCount();
  },

  percentComplete: function () {
    return this.wordChecker().percentComplete();
  },

  cars: function () {
    if (!this._cars) {
      this._cars = new CodeRacer.Collections.Cars([], {
        track: this
      });
    }
    return this._cars;
  },

  wordChecker: function () {
    if (!this._wordChecker) {
      this._wordChecker = new CodeRacer.Models.WordChecker(this.get('content'));
    }
    return this._wordChecker;
  },

  parse: function (data) {
    if (data.content) {
      this.wordChecker().setContent(data.content);
    }
    return data;
  },

  notify: function (wpm, percentComplete) {
    $.ajax({
      type: 'POST',
      url: '/api/wpm',
      data: {
        id: this.car.id,
        wpm: wpm,
        percent_complete: percentComplete,
        race_id: this.car.get('race_id')
      }
    });
  },

  bindTrackEvents: function () {
    this.channel.bind('add_car', function (otherCar) {
      this.cars().add(otherCar)
    }.bind(this));
    this.channel.bind('client-update_speed', function (speed) {
      debugger;
      this.cars().get(speed.id).set('wpm', speed.wpm);
    }.bind(this));
  },

  join: function (timer) {
    this.cars().create({
      track_id: this.id
    }, {
      success: function (car) {
        this.car = car;
        timer.startAt(new Date(car.get('start_at')));
        this.channel = CodeRacer.pusher.subscribe('race_' + car.get('race_id'));
        this.bindTrackEvents();
      }.bind(this)
    });
  },
});
