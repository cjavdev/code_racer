CodeRacer.Views.Settings = Backbone.View.extend({
  template: JST['users/settings'],
  tagName: "form",

  events: {
    'submit': 'update'
  },

  update: function (event) {
    event.preventDefault();
    this.model.set({ nickname: this.$('input').val() });
    this.model.save();
  },

  render: function () {
    var content = this.template({
      user: this.model
    });

    this.$el.html(content);
    return this;
  },
});
