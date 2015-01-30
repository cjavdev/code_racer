/*globals window, Backbone, CodeRacer, $, io */
window.CodeRacer = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
    this.router = new CodeRacer.Routers.Router({
      $rootEl: $('#main')
    });

    CodeRacer.setupPresence();
    CodeRacer.installHeader();
    Backbone.history.start();
  },

  installHeader: function () {
    var header = new CodeRacer.Views.Header({
      router: this.router
    });
    $('#header').html(header.render().$el);
  },

  setupPresence: function () {
    CodeRacer.onlineUsers.add(new CodeRacer.Models.User(window.CURRENT_RACER));
    CodeRacer.invites = new Backbone.Collection();
    CodeRacer.socket.on('invite', function (data) {
      if (data.id == window.CURRENT_RACER.id) {
        CodeRacer.invites.add(data);
      }
    });
    CodeRacer.socket.on('online_users', function (data) {
      console.log('online users: ', data);
      CodeRacer.onlineUsers.set(data);
    });
    CodeRacer.socket.emit('register', window.CURRENT_RACER);
  }
};

CodeRacer.socket = io(window.SOCKET_PATH);
