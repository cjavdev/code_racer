/*globals CodeRacer, Backbone, _ */
CodeRacer.Views.StageRacers = Backbone.View.extend({
  initialize: function () {
    this._racerViews = [];
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addRacer);
    this.collection.each(this.addRacer, this);
  },

  render: function () {
    this.renderRacers();
    return this;
  },

  renderRacers: function () {
    this.$el.empty();
    _(this._racerViews).each(function (view) {
      this.$el.append(view.render().$el);
      view.delegateEvents();
    }, this);
  },

  addRacer: function (racer) {
    var view = new CodeRacer.Views.StageRacer({
      model: racer
    });
    this._racerViews.push(view);
    this.$el.append(view.render().$el);
  },
});
