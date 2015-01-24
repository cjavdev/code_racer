CodeRacer.Views.WaitingArea = Backbone.View.extend({
  template: JST['stage/waiting_area'],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },
});
