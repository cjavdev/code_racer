/*globals CodeRacer, Backbone */
CodeRacer.Collections.Users = Backbone.Collection.extend({
  model: CodeRacer.Models.User,

  initialize: function (models, options) {
    if(options && options.track) {
      this.track = options.track;
    }
  },

  url: function () {
    return this.track.url() + '/leaders';
  }
});
