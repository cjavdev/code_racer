/*globals window, Pusher, Backbone, CodeRacer, $ */
window.CodeRacer = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
    var router = new CodeRacer.Routers.Router({
      $rootEl: $('#main')
    });

    var header = new CodeRacer.Views.Header({
      router: router
    });

    $('#header').html(header.render().$el);

    // Add the current user to the list of online users
    CodeRacer.onlineUsers.add(new CodeRacer.Models.User(window.CURRENT_RACER));

    $.ajax({
      url: '/api/online_user',
      type: 'POST',
      data: window.CURRENT_RACER
    });

    Backbone.history.start();
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

$(window).on('beforeunload', function() {
  var x = cleanup();
  return x;
});
