/*globals CodeRacer, Backbone, JST */
CodeRacer.Views.TracksIndex = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },

  template: JST['tracks/index'],

  render: function () {
    var content = this.template({
      tracks: this.collection
    });
    this.$el.html(content);

    return this;
  }
});
