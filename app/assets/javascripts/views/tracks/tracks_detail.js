CodeRacer.Views.TrackDetail = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  template: JST['tracks/detail'],

  events: {
    'keyup input': 'handleKeyUp'
  },

  handleKeyUp: function (event) {
    if(event.keyCode === 16) {
      return;
    }
    if(event.keyCode === 32) {
      if(this.model.wordComplete(this.$('input').val())) {
        this.$('input').val('');
      }
    }
    if(!this.model.checkWord(this.$('input').val())) {
      this.$('input').addClass('wrong');
    } else {
      this.$('input').removeClass('wrong');
    }
    this.renderContent();
  },

  renderContent: function () {
    this.$('.content').html(this.model.content());
  },

  render: function () {
    var content = this.template({
      track: this.model
    });
    this.$el.html(content);
    return this;
  },
});
