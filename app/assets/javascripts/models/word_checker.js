/*globals CodeRacer, Backbone, _ */
CodeRacer.Models.WordChecker = function () {
  this.currentIndex = 0;
  this.words = [];
};

CodeRacer.Models.WordChecker.prototype = {
  setContent: function (content) {
    this.words = this._splitIntoWords(content || "");
  },

  currentWord: function () {
    return this.words[this.currentIndex];
  },

  render: function () {
    var i, result = [];
    for (i = 0; i < this.words.length; i++) {
      if (this.currentIndex === i) {
        result.push("<strong>");
      }
      result.push(this.words[i]);
      if (this.currentIndex === i) {
        result.push("</strong>");
      }
      result.push(" ");
    }
    return result.join("").trim();
  },

  currentWordCount: function () {
    return this.currentIndex;
  },

  checkWord: function (word) {
    if(word.endsWith(" ")) {
      return this._wordComplete(word);
    }

    if (this._onLastWord() && word === this.currentWord()) {
      this.currentIndex++;
      this.trigger('next');
      this.trigger('over');
      return true;
    }

    if (this.currentWord().startsWith(word)) {
      return true;
    }

    return false;
  },

  wordCount: function () {
    return this.words.length;
  },

  moreWords: function () {
    return this.currentIndex < this.words.length;
  },

  percentComplete: function () {
    return parseInt(100 * (this.currentIndex / this.words.length), 10);
  },

  _splitIntoWords: function (content) {
    return content.split(/\s+/);
  },

  _onLastWord: function () {
    return this.currentIndex === this.words.length - 1;
  },

  _wordComplete: function (word) {
    if (this._currentPaddedWord() === word) {
      this.currentIndex++;
      this.trigger('next');
      return true;
    }
    return false;
  },

  _currentPaddedWord: function () {
    return this.currentWord() + ' ';
  },
};

_.extend(CodeRacer.Models.WordChecker.prototype, Backbone.Events);
