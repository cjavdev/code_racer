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

CodeRacer.onlineUsers = new CodeRacer.Collections.Users();

CodeRacer.onlineUsers.fetch({
  url: "/api/online_user"
});

CodeRacer.presence.bind('add_user', function (data) {
  console.log('ADDING USER', data);
  CodeRacer.onlineUsers.add(data);
});

CodeRacer.presence.bind('remove_user', function (data) {
  console.log('REMOVING USER', data);
  var user = CodeRacer.onlineUsers.get(data.id);
  if(user) {
    CodeRacer.onlineUsers.remove(user);
  }
});
