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

  content: function () {
    return this.wordChecker().render();
  },

  wordChecker: function () {
    if(!this._wordChecker) {
      this._wordChecker = new WordChecker(this.get('content'));
    }
    return this._wordChecker;
  },

  parse: function (data) {
    if(data.content) {
      this.wordChecker().setContent(data.content);
    }
    return data;
  },
});

function WordChecker(content) {
  this.setContent(content);
  this.currentIndex = 0;
}

WordChecker.prototype.setContent = function(content) {
  this.words = this.splitIntoWords(content || "");
};

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

WordChecker.prototype.render = function() {
  var i, result = [];
  for(i = 0; i < this.words.length; i++) {
    if(this.currentIndex === i) {
      result.push("<strong>");
    }
    result.push(this.words[i]);
    if(this.currentIndex === i) {
      result.push("</strong>");
    }
    result.push(" ");
  }
  return result.join("");
};

WordChecker.prototype.checkWord = function(word) {
  if(this.currentWord().startsWith(word)) {
    return true;
  }

  return false;
};
