CodeRacer.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'index',
    '_=_': 'index',
    'track/new': 'new',
    'track/:id': 'track'
  },

  new: function () {
    var view = new CodeRacer.Views.TrackNew({
      model: new CodeRacer.Models.Track()
    });

    this._swapView(view);
  },

  index: function () {
    CodeRacer.tracks.fetch();

    var view = new CodeRacer.Views.TracksIndex({
      collection: CodeRacer.tracks
    });

    this._swapView(view);
  },

  track: function (id) {
    var track = new CodeRacer.Models.Track({ id: id });
    track.fetch();

    var view = new CodeRacer.Views.TrackDetail({
      model: track
    });

    this._swapView(view);
  },

  _swapView: function (view) {
    this._current && this._current.remove();
    this._current = view;
    this.$rootEl.html(view.render().$el);
  },
});
