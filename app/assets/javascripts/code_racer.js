/*globals window, Pusher, Backbone, CodeRacer, $ */
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
    $.ajax({
      url: '/api/online_user',
      type: 'POST',
      data: window.CURRENT_RACER
    });

    CodeRacer.invites = new Backbone.Collection();
    CodeRacer.presence.bind('invite', function (data) {
      if(data.id === window.CURRENT_RACER.id) {
        CodeRacer.invites.add(data);
      }
    });
  }
};

Pusher.log = function (message) {
  if (window.console && window.console.log) {
    window.console.log(message);
  }
};

CodeRacer.pusher = new Pusher('ec38d09303a657c3fd5e');
CodeRacer.presence = CodeRacer.pusher.subscribe('presence');

function cleanup() {
  CodeRacer.pusher.disconnect();
  $.ajax({
    url: '/api/online_user',
    type: 'DELETE',
    data: window.CURRENT_RACER
  });
}

$(window).on('beforeunload', function () {
  var x = cleanup();
  return x;
});
