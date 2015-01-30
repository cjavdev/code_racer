/*globals CodeRacer, Backbone */
CodeRacer.Collections.Stages = Backbone.Collection.extend({
  model: CodeRacer.Models.Stage,
  url: '/api/stages'
});
