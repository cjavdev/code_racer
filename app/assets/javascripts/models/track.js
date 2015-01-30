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
    console.log('notifying: ', this.speedUpdateKey());
    CodeRacer.socket.emit(this.speedUpdateKey(), {
      id: this.car.id,
      wpm: wpm,
      percent_complete: percentComplete,
      race_id: this.car.get('race_id')
    });

    if (over) {
      this.car.set({
        wpm: wpm
      });
      this.car.save();
      this.leaders().fetch();
    }
  },

  addCar: function (car) {
    console.log('Adding car');
    this.cars().add(car);
  },

  updateSpeed: function (speed) {
    console.log('speed update');
    this.cars().get(speed.id).set('wpm', speed.wpm);
    this.cars().get(speed.id).set('percent_complete', speed.percent_complete);
  },

  raceUpdate: function (data) {
    console.log('Race update:', data);
    this.cars().set(data);
  },

  bindTrackEvents: function () {
    CodeRacer.socket.on(this.speedUpdateKey(), this.updateSpeed.bind(this));
    CodeRacer.socket.on(this.raceUpdateKey(), this.raceUpdate.bind(this));
  },

  raceUpdateKey: function () {
    return 'race_' + this.raceId() + '_update';
  },

  speedUpdateKey: function () {
    return 'update_' + this.raceId() + '_speed';
  },

  raceId: function () {
    return this.car.get('race_id');
  },

  join: function (timer) {
    this.car = new CodeRacer.Models.Car({
      track_id: this.id
    });
    this.car.collection = this.cars();
    this.car.save().then(function () {
      CodeRacer.socket.emit('add_car', this.car.toJSON());
      timer.startAt(new Date(this.car.get('start_at')));
      this.bindTrackEvents();
    }.bind(this));
  },
});
