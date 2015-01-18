CodeRacer.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'index',
    'track/:id': 'track'
  },

  index: function () {
    CodeRacer.tracks.fetch();

    var view = new CodeRacer.Views.TracksIndex({
      collection: CodeRacer.tracks
    });

    this._swapView(view);
  },

  track: function (id) {
    var track = CodeRacer.tracks.getOrFetch(id);

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
