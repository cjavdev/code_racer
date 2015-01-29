CodeRacer.Views.Online = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, 'add', this.render);
  },

  template: JST['users/online'],

  render: function () {
    var content = this.template();
    this.$el.html(content);

    this.collection.each(function (user) {
      var view = new CodeRacer.Views.OnlineItem({
        model: user
      });
      this.$('ul').append(view.render().$el);
    }, this);
    return this;
  },
});
