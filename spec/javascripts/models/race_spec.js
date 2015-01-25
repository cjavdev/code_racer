//= require backbone
//= require ../../../app/assets/javascripts/models/race
/*globals describe, afterEach, beforeEach, spyOn, CodeRacer, expect, it */
describe("Race", function () {
  var race, track, timer, wordChecker;

  afterEach(function () {
    track = undefined;
    timer = undefined;
    race = undefined;
  });

  beforeEach(function () {
    track = new CodeRacer.Models.Track({
      id: 15
    });
    timer = new CodeRacer.Models.Timer();
    wordChecker = new CodeRacer.Models.WordChecker();
  });

  describe("#constructor", function () {
    it("fetches the track when constructed", function () {
      spyOn(track, 'fetch');
      race = new CodeRacer.Models.Race(track, timer, wordChecker);
      expect(track.fetch).toHaveBeenCalled();
    });

    it("joins the track and timer", function () {
      spyOn(track, 'join');
      race = new CodeRacer.Models.Race(track, timer, wordChecker);
      expect(track.join).toHaveBeenCalledWith(timer);
    });

    it("listens for changes to content and updates wordChecker", function () {
      spyOn(wordChecker, 'setContent');
      race = new CodeRacer.Models.Race(track, timer, wordChecker);
      track.set('content', 'this is a test');
      expect(wordChecker.setContent).toHaveBeenCalled();
    });
  });

  it("#cars, delegates cars to the track", function () {
    race = new CodeRacer.Models.Race(track, timer, wordChecker);
    expect(race.cars()).toEqual(track.cars());
  });

  it("#leaders, delegates leaders to the track", function () {
    race = new CodeRacer.Models.Race(track, timer, wordChecker);
    expect(race.leaders()).toEqual(track.leaders());
  });

  it('#content, returns the rendered content from the track', function () {
    race = new CodeRacer.Models.Race(track, timer, wordChecker);
    wordChecker.setContent("this is a test");
    expect(race.content()).toEqual("<strong>this</strong> is a test");
  });

  describe("#wpm", function () {
    it("returns 0 if the timer is still counting down", function () {
      race = new CodeRacer.Models.Race(track, timer, wordChecker);
      expect(race.wpm()).toEqual(0);
    });

    it("returns 4 if the timer has 60 seconds and 4 words have been typed", function () {
      race = new CodeRacer.Models.Race(track, timer, wordChecker);
      timer.countDown = false;
      timer.seconds = 60;
      wordChecker.currentIndex = 4;
      expect(race.wpm()).toEqual((4).toFixed(2));
    });
  });

  it("#time, returns a nice display of seconds from timer", function () {
    race = new CodeRacer.Models.Race(track, timer, wordChecker);
    timer.seconds = 5.5;
    expect(race.time()).toEqual(5);
  });

  it('#started, returns true if timer is counting up', function () {
    race = new CodeRacer.Models.Race(track, timer, wordChecker);
    expect(race.started()).toEqual(false);
    timer.countDown = false;
    expect(race.started()).toEqual(true);
  });

});
