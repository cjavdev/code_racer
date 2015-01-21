(function () {
  var WordChecker = CodeRacer.Models.WordChecker = function (content) {
    this.setContent(content);
    this.currentIndex = 0;
  }

  WordChecker.prototype = {
    setContent: function (content) {
      this.words = this.splitIntoWords(content || "");
    },

    splitIntoWords: function (content) {
      return content.split(" ");
    },

    currentWord: function () {
      return this.words[this.currentIndex];
    },

    currentPaddedWord: function () {
      return this.currentWord() + ' ';
    },

    wordComplete: function (word) {
      if (this.currentPaddedWord() === word) {
        this.currentIndex++;
        return true;
      }
      return false;
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
      return result.join("");
    },

    currentWordCount: function () {
      return this.currentIndex;
    },

    checkWord: function (word) {
      if (this.currentIndex === this.words.length - 1 && word === this.currentWord()) {
        this.currentIndex++;
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
      return this.currentIndex !== this.words.length;
    },
  };
}());
