/*globals CodeRacer, Backbone, JST */
CodeRacer.Views.StageShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.racersView = new CodeRacer.Views.StageRacers({
      collection: this.model.racers()
    });

    this.onlineView = new CodeRacer.Views.Online({
      collection: CodeRacer.onlineUsers
    });
  },

  events: {
    'click .start-race': 'startRace'
  },

  startRace: function () {
    this.model.startRace();
  },

  template: JST['stages/show'],

  renderRacers: function () {
    this.$('.racers').html(this.racersView.render().$el);
  },

  renderOnline: function () {
    this.$('.online').html(this.onlineView.render().$el);
  },

  render: function () {
    var content = this.template({
      stage: this.model
    });
    this.$el.html(content);
    this.renderRacers();
    this.renderOnline();
    return this;
  },
});
