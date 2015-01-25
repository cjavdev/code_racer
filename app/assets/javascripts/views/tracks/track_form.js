/*globals CodeRacer, Backbone, JST */
CodeRacer.Views.TrackForm = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  tagName: "form",
  template: JST['tracks/form'],
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
    var content = this.template({
      car: this.model
    });
    this.$el.html(content);
    return this;
  },
});
