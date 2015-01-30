/*globals CodeRacer, Backbone, _, JST, window, $ */
CodeRacer.Models.Stage = Backbone.Model.extend({
  urlRoot: '/api/stages',

  inviteUrl: function () {
    return window.location.origin + '/#/staging/' + this.get('token');
  },

  startRace: function () {
    CodeRacer.socket.emit('start_race_' + this.get('token'), {
      stage: this.get('token')
    });
  },

  bindEvents: function (token) {
    CodeRacer.socket.on('start_race_' + token, function (data) {
      Backbone.history.navigate("#track/" + data.track_id, {
        trigger: true
      });
    }.bind(this));

    CodeRacer.socket.on('update_stage_' + token, function (data) {
      this.racers().set(data);
    }.bind(this));
  },

  racers: function () {
    if (!this._racers) {
      this._racers = new CodeRacer.Collections.Users();
    }
    return this._racers;
  },

  parse: function (data) {
    if (data.racers) {
      this.racers().set(data.racers, {
        parse: true
      });
    }

    this.joinStage(data.token);
    this.bindEvents(data.token);
    return data;
  },

  joinStage: function (token) {
    var joinData = _.extend({
      token: token
    }, window.CURRENT_RACER);
    CodeRacer.socket.emit('join_stage', joinData);
  },
});
