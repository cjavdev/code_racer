CodeRacer.Collections.Tracks = Backbone.Collection.extend({
  url: '/api/tracks',
  model: CodeRacer.Models.Track,

  getOrFetch: function (id) {
    var model = this.get(id);
    if(!model) {
      model = new CodeRacer.Models.Track({ id: id });
      model.fetch();
    } else {
      model.fetch();
    }
    return model;
  },
});

CodeRacer.tracks = new CodeRacer.Collections.Tracks();
