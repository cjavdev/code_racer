/*global CodeRacer, Backbone, $ */
CodeRacer.Models.Track = Backbone.Model.extend({
  urlRoot: '/api/tracks',

  cars: function () {
    if (!this._cars) {
      this._cars = new CodeRacer.Collections.Cars([], {
        track: this
      });
    }
    return this._cars;
  },

  topDog: function () {
    if (!this._topDog) {
      this._topDog = new CodeRacer.Models.User();
    }

    return this._topDog;
  },

  leaders: function () {
    if (!this._leaders) {
      this._leaders = new CodeRacer.Collections.Users([], {
        track: this
      });
    }
    return this._leaders;
  },

  parse: function (data) {
    if (data.top_dog) {
      this.topDog().set(data.top_dog);
    }

    if (data.leaders) {
      this.leaders().set(data.leaders, {
        parse: true
      });
    }
    return data;
  },

  notify: function (wpm, percentComplete, over) {
    $.ajax({
      type: 'POST',
      url: '/api/wpm',
      data: {
        id: this.car.id,
        wpm: wpm,
        percent_complete: percentComplete,
        race_id: this.car.get('race_id')
      }
    });

    if (over) {
      this.car.set({
        wpm: wpm
      });
      this.car.save();
      this.leaders().fetch();
    }
  },

  bindTrackEvents: function () {
    this.channel.bind('add_car', function (otherCar) {
      this.cars().add(otherCar);
    }.bind(this));
    this.channel.bind('update_speed', function (speed) {
      this.cars().get(speed.id).set('wpm', speed.wpm);
      this.cars().get(speed.id).set('percent_complete', speed.percent_complete);
    }.bind(this));
  },

  join: function (timer) {
    this.car = new CodeRacer.Models.Car({
      track_id: this.id
    });
    this.car.collection = this.cars();
    this.car.save().then(function () {
      this.cars().add(this.car);
      timer.startAt(new Date(this.car.get('start_at')));
      this.channel = CodeRacer.pusher.subscribe('race_' + this.car.get('race_id'));
      this.bindTrackEvents();
    }.bind(this));
  },
});
