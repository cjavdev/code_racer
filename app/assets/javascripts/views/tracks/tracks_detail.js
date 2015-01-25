/*globals CodeRacer, Backbone, _, JST */
CodeRacer.Views.TrackDetail = Backbone.View.extend({
  initialize: function (options) {
    this.race = options.race;
    this.listenTo(this.race, 'sync', this.render);
    this.listenTo(this.race, 'go', this.startRace);
    this.listenTo(this.race, 'next', this.advanceWord);
    this.listenTo(this.race, 'over', this.gameOver);
    this.initializeSubviews();
  },

  advanceWord: function () {
    this.renderContent();
    this.clearInput();
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
      this.handleWord(typed);
      this.validateInput();
    }.bind(this), 0);
  },

  clearInput: function () {
    this.$('input').val('');
  },

  validateInput: function() {
    if (this.race.valid()) {
      this.$('input').removeClass('wrong');
    } else {
      this.$('input').addClass('wrong');
    }
  },

  handleWord: function (word) {
    return this.race.checkWord(word);
  },

  gameOver: function () {
    this.$('input').prop('disabled', true);
    this.gameOverView = new CodeRacer.Views.TrackOver({
      wpm: this.race.wpm()
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
