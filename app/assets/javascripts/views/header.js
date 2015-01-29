/*globals CodeRacer, Backbone, JST */
CodeRacer.Views.Header = Backbone.View.extend({
  initialize: function () {
    this.listenTo(CodeRacer.invites, 'add', this.render);
  },

  template: JST['header'],

  render: function () {
    var content = this.template({
      invites: CodeRacer.invites
    });
    this.$el.html(content);
    return this;
  },
});
