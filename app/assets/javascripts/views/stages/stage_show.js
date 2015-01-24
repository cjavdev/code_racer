CodeRacer.Views.StageShow = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  template: JST['stages/show'],

  render: function () {
    var content = this.template({
      stage: this.model
    });
    this.$el.html(content);
    return this;
  },
});
