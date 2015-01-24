CodeRacer.Models.Stage = Backbone.Model.extend({
  urlRoot: '/api/stages',

  inviteUrl: function () {
    return window.location.origin + '/#/staging/' + this.get('token');
  },

  startRace: function () {
    $.ajax({
      url: this.url() + '/start',
      type: 'POST'
    });
  },

  bindEvents: function () {
    this.channel.bind('start_race', function (data) {
      Backbone.history.navigate("#track/" + data.track_id, {
        trigger: true
      });
    }.bind(this));
    this.channel.bind('add_racer', function (data) {
      this.racers().add(data);
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
      })
    }
    this.channel = CodeRacer.pusher.subscribe('stage_' + data.token);
    this.bindEvents();
    return data;
  },
});
