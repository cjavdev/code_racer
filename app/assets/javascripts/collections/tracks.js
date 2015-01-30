/*global CodeRacer, Backbone */
CodeRacer.Collections.Tracks = Backbone.Collection.extend({
  model: CodeRacer.Models.Track,
  url: '/api/tracks',
});

CodeRacer.tracks = new CodeRacer.Collections.Tracks();
