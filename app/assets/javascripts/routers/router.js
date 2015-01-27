/*globals CodeRacer, Backbone */
CodeRacer.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'index',
    '_=_': 'index',
    'track/new': 'new',
    'track/:id': 'track',
    'track/:id/edit': 'edit',
    'staging(/:token)': 'staging',
    'stats': 'stats',
    'settings': 'settings'
  },

  settings: function () {
    var view = new CodeRacer.Views.Settings({
      model: new CodeRacer.Models.User(window.CURRENT_RACER)
    });

    this._swapView(view);
  },

  stats: function () {
    var stats = new CodeRacer.Collections.Stats();
    stats.fetch();

    var view = new CodeRacer.Views.StatsDetail({
      collection: stats
    });

    this._swapView(view);
  },

  staging: function (token) {
    var stage = new CodeRacer.Models.Stage();
    if (token) {
      stage.set({
        token: token,
        id: token
      });
      stage.fetch({
        data: {
          token: token
        }
      });
    } else {
      stage.save();
    }

    var view = new CodeRacer.Views.StageShow({
      model: stage
    });

    this._swapView(view);
  },

  edit: function (id) {
    var track = new CodeRacer.Models.Track({
      id: id
    });
    track.fetch();

    var view = new CodeRacer.Views.TrackForm({
      model: track
    });

    this._swapView(view);
  },

  new: function () {
    var view = new CodeRacer.Views.TrackForm({
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
    var track = new CodeRacer.Models.Track({
      id: id
    });
    var timer = new CodeRacer.Models.Timer();
    var wordChecker = new CodeRacer.Models.WordChecker();
    var race = new CodeRacer.Models.Race(track, timer, wordChecker);

    var view = new CodeRacer.Views.TrackDetail({
      model: track,
      race: race
    });

    this._swapView(view);
  },

  _swapView: function (view) {
    this._current && this._current.remove();
    this._current = view;
    this.$rootEl.html(view.render().$el);
  },
});
