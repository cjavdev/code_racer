CodeRacer.Views.CarsIndexItem = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  template: JST['cars/index_item'],
  tagName: "li",

  render: function () {
    var content = this.template({
      car: this.model
    });
    this.$el.html(content);
    return this;
  },
});
