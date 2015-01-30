//= require jquery
//= require underscore
//= require backbone
//= require code_racer
//= require_tree ../../../app/assets/javascripts/models

describe("Track", function () {
  it("Should parse thing", function () {
    var t = new CodeRacer.Models.Track()
    expect(t)
  });
});
