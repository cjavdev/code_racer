CodeRacer.Views.StageRacer = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  className: 'list-group-item',

  template: JST['stages/racer'],

  render: function () {
    var content = this.template({
      racer: this.model
    });
    this.$el.html(content);
    return this;
  },
});
