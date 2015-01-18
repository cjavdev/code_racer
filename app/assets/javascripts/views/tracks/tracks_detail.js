CodeRacer.Views.TrackDetail = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  template: JST['tracks/detail'],

  render: function () {
    var content = this.template({
      track: this.model
    });
    this.$el.html(content);
    return this;
  },
});
