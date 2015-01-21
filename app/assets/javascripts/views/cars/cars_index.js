CodeRacer.Views.CarsIndex = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },

  template: JST['cars/index'],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },
});
