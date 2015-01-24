CodeRacer.Views.StageShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.racersView = new CodeRacer.Views.StageRacers({
      collection: this.model.racers()
    });
  },

  events: {
    'click .start-race': 'startRace'
  },

  startRace: function () {
    console.log('Start Race!');
  },

  template: JST['stages/show'],

  renderRacers: function () {
    this.$('.racers').html(this.racersView.render().$el);
  },

  render: function () {
    var content = this.template({
      stage: this.model
    });
    this.$el.html(content);
    this.renderRacers();
    return this;
  },
});
