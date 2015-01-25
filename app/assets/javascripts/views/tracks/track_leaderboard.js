/*globals CodeRacer, Backbone, JST */
CodeRacer.Views.LeaderBoard = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },

  template: JST['tracks/leaderboard'],

  render: function () {
    var content = this.template({
      leaders: this.collection
    });
    this.$el.html(content);
    return this;
  },
});
