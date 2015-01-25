//= require ../../../app/assets/javascripts/models/word_checker

describe("WordChecker", function () {
  var wordChecker;

  describe("#setContent", function () {
    it("splits on spaces and stores in words", function () {
      wordChecker = new CodeRacer.Models.WordChecker();
      wordChecker.setContent("this is a test");
      expect(wordChecker.words).toEqual(["this", "is", "a", "test"])
    });

    it("handles multiple spaces as one", function () {
      wordChecker = new CodeRacer.Models.WordChecker();
      wordChecker.setContent("this is a  test");
      expect(wordChecker.words).toEqual(["this", "is", "a", "test"])
    });
  });

  describe("#currentWord", function () {
    it("returns the first word to start", function () {
      wordChecker = new CodeRacer.Models.WordChecker();
      wordChecker.setContent("this is a test");
      expect(wordChecker.currentWord()).toEqual("this");
    });
  });

  it("#wordCount returns the number of words", function () {
    wordChecker = new CodeRacer.Models.WordChecker();
    wordChecker.setContent("this is a test");
    expect(wordChecker.wordCount()).toEqual(4);
  });

  describe("#checkWord", function () {
    beforeEach(function () {
      wordChecker = new CodeRacer.Models.WordChecker();
      wordChecker.setContent("this is a test");
    });

    it("returns true, but doesn't advance for partial matches", function () {
      expect(wordChecker.checkWord("thi")).toEqual(true);
    });

    it("returns true for complete matches", function () {
      expect(wordChecker.checkWord("this")).toEqual(true);
    });

    it("returns true and advances if currently considering last word an word matches", function () {
      wordChecker.currentIndex = 3;
      expect(wordChecker.checkWord("test")).toEqual(true);
      expect(wordChecker.currentIndex).toEqual(4);
    });

    it("returns true and advances if the word is correct and followed by a space", function () {
      expect(wordChecker.checkWord("this ")).toEqual(true);
      expect(wordChecker.currentIndex).toEqual(1);
    });
  });

  it("#moreWords, returns true if current index is less than total words", function () {
    wordChecker.currentIndex = 3;
    expect(wordChecker.moreWords()).toEqual(true);
    wordChecker.currentIndex = 4;
    expect(wordChecker.moreWords()).toEqual(false);
    wordChecker.currentIndex = 5;
    expect(wordChecker.moreWords()).toEqual(false);
  });
});
