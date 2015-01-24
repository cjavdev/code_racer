CodeRacer.Models.Stage = Backbone.Model.extend({
  urlRoot: '/api/stages',

  inviteUrl: function () {
    return window.location.origin + '/#/staging/' + this.get('token');
  },

  bindEvents: function () {
    this.channel.bind('add_racer', function (data) {
      this.racers().add(data);
    }.bind(this));
  },

  racers: function () {
    if(!this._racers) {
      this._racers = new CodeRacer.Collections.Users();
    }
    return this._racers;
  },

  parse: function (data) {
    if(data.racers) {
      this.racers().set(data.racers, { parse: true })
    }
    this.channel = CodeRacer.pusher.subscribe('stage_' + data.token);
    this.bindEvents();
    return data;
  },
});
