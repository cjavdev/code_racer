CodeRacer.Models.Track = Backbone.Model.extend({
  urlRoot: '/api/tracks',

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

  wordChecker: function () {
    if(!this._wordChecker) {
      this._wordChecker = new WordChecker(this.get('content'));
    }
    return this._wordChecker;
  },
});

function WordChecker(content) {
  this.words = this.splitIntoWords(content);
  this.currentIndex = 0;
}

WordChecker.prototype.splitIntoWords = function(content) {
  return content.split(" ");
};

WordChecker.prototype.currentWord = function() {
  return this.words[this.currentIndex];
};

WordChecker.prototype.currentPaddedWord = function() {
  return this.currentWord() + ' ';
};

WordChecker.prototype.wordComplete = function (word) {
  if(this.currentPaddedWord() === word) {
    this.currentIndex++;
    return true;
  }
  return false;
};

WordChecker.prototype.checkWord = function(word) {
  if(this.currentWord().startsWith(word)) {
    return true;
  }

  return false;
};
