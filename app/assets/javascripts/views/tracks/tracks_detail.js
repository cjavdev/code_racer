CodeRacer.Views.TrackDetail = Backbone.View.extend({
  initialize: function (options) {
    this.race = options.race;

    this.listenTo(this.race, 'sync', this.render);
    this.listenTo(this.race, 'go', this.startRace);

    this.initializeSubviews();
  },

  initializeSubviews: function () {
    this.carsIndex = new CodeRacer.Views.CarsIndex({
      collection: this.race.cars()
    });

    this.timerView = new CodeRacer.Views.TrackTimer({
      race: this.race,
      timer: this.race.timer,
      track: this.model
    });

    this.leaderBoardView = new CodeRacer.Views.LeaderBoard({
      collection: this.race.leaders()
    });
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
      var typed = $input.val();

      if (event.keyCode === 32) {
        this.handleWord(typed);
      }

      this.validateInput(typed);
      this.renderContent();

      if (!this.model.moreWords()) {
        this.gameOver();
      }
    }.bind(this), 0);
  },

  clearInput: function () {
    this.$('input').val('');
  },

  validateInput: function(word) {
    if (!this.model.checkWord(word)) {
      this.$('input').addClass('wrong');
    } else {
      this.$('input').removeClass('wrong');
    }
  },

  handleWord: function (word) {
    if (this.model.wordComplete(word)) {
      this.clearInput();
      this.model.notify(this.timerView.wpm(), this.model.percentComplete());
    }
  },

  gameOver: function () {
    this.model.notify(this.timerView.wpm(), this.model.percentComplete(), true);
    this.timer.stop();
    this.$('input').prop('disabled', true);
    this.gameOverView = new CodeRacer.Views.TrackOver({
      wpm: this.timerView.wpm()
    });
    this.$el.append(this.gameOverView.render().$el);
  },

  renderContent: function () {
    this.$('.content').html(this.race.content());
  },

  renderLeaderBoard: function () {
    this.$('.leaderboard').html(this.leaderBoardView.render().$el);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.$('input').prop('disabled', true);
    this.renderContent();
    this.renderTimer();
    this.renderCars();
    this.renderLeaderBoard();
    return this;
  },
});
