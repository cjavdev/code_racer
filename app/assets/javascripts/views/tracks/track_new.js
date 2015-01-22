CodeRacer.Views.TrackNew = Backbone.View.extend({
  tagName: "form",
  template: JST['tracks/new'],
  className: "form",
  attributes: {
    role: "form"
  },

  events: {
    "submit": "submit"
  },

  submit: function (event) {
    event.preventDefault();
    var data = this.$el.serializeJSON();
    this.model.save(data).then(function () {
      Backbone.history.navigate("/", { trigger: true });
    });
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },
});
