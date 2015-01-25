/*globals CodeRacer, Backbone, _, JST */
CodeRacer.Views.CarsIndex = Backbone.View.extend({
  initialize: function () {
    this._carViews = [];
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addCar);
    this.collection.each(this.addCar, this);
  },

  addCar: function (car) {
    var view = new CodeRacer.Views.CarsIndexItem({
      model: car
    });
    this._carViews.push(view);
    this.$el.append(view.render().$el);
  },

  renderCars: function () {
    this.$el.empty();
    _(this._carViews).each(function (v) {
      this.$el.append(v.$el);
      v.delegateEvents();
    }, this);
  },

  render: function () {
    this.renderCars();
    return this;
  },
});
