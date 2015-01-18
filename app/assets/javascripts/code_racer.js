window.CodeRacer = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new CodeRacer.Routers.Router({
      $rootEl: $('#main')
    });

    Backbone.history.start();
  }
};
