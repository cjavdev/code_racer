CodeRacer.Views.Online = Backbone.View.extend({
  template: JST['users/online'],

  render: function () {
    var content = this.template({
      users: this.collection
    });

    this.$el.html(content);
    return this;
  },
});
