CodeRacer.Collections.Tracks = Backbone.Collection.extend({
  url: '/api/tracks',
  model: CodeRacer.Models.Track
});

CodeRacer.tracks = new CodeRacer.Collections.Tracks();
