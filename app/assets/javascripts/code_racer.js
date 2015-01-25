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

    Backbone.history.start();
  }
};

Pusher.log = function (message) {
  if (window.console && window.console.log) {
    window.console.log(message);
  }
};

CodeRacer.pusher = new Pusher('ec38d09303a657c3fd5e');
