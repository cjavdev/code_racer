/*global CodeRacer, Backbone, $, window, JST */
CodeRacer.Views.OnlineItem = Backbone.View.extend({
  template: JST['users/online_item'],
  tagName: "li",
  className: "list-group-item clearfix",

  events: {
    'click .invite': 'invite'
  },

  invite: function () {
    var stageUrl = $('.big-input').val();

    CodeRacer.socket.emit('invite', {
      id: this.model.id,
      url: stageUrl,
      nickname: window.CURRENT_RACER.nickname
    });
  },

  render: function () {
    var content = this.template({
      user: this.model
    });

    this.$el.html(content);
    return this;
  },
});
