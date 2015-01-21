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

  join: function () {
    this.cars().create({
      track_id: this.id
    }, {
      success: function (car) {
        this.channel = CodeRacer.pusher.subscribe('race_' + car.get('race_id'));
        this.channel.bind('add_car', function (data) {
          alert(data.message);
        });
      }.bind(this)
    });
  },
});
