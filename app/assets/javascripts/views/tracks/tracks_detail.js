CodeRacer.Views.TrackDetail = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.timer = new CodeRacer.Models.Timer();
    this.carsIndex = new CodeRacer.Views.CarsIndex({
      collection: this.model.cars()
    });

    this.timerView = new CodeRacer.Views.TrackTimer({
      timer: this.timer,
      track: this.model
    });

    this.listenTo(this.timer, 'go', this.startRace);
  },

  renderCars: function () {
    this.$('.cars').html(this.carsIndex.render().$el);
  },

  startRace: function () {
    this.$('input').prop('disabled', false);
    this.$('input').focus();
  },

  template: JST['tracks/detail'],

  events: {
    'keydown input': 'handleKeyDown'
  },

  renderTimer: function () {
    this.$('.timer').html(this.timerView.render().$el);
  },

  handleKeyDown: function (event) {
    if (event.keyCode === 16) {
      return;
    }
    var $input = this.$('input');
    setTimeout(function () {
      if (event.keyCode === 32) {
        if (this.model.wordComplete($input.val())) {
          $input.val('');
        }
      }
      if (!this.model.checkWord($input.val())) {
        $input.addClass('wrong');
      } else {
        $input.removeClass('wrong');
      }
      if(this.model.moreWords()) {
        this.renderContent();
      } else {
        this.gameOver();
      }
    }.bind(this), 0);
  },

  gameOver: function () {
    this.timer.stop();
    this.$('input').prop('disabled', true);
    this.gameOverView = new CodeRacer.Views.TrackOver({
      wpm: this.timerView.wpm()
    });
    this.$el.append(this.gameOverView.render().$el);
  },

  renderContent: function () {
    this.$('.content').html(this.model.content());
  },

  render: function () {
    var content = this.template({
      track: this.model
    });
    this.$el.html(content);
    this.$('input').prop('disabled', true);
    this.renderTimer();
    this.renderCars();
    return this;
  },
});
