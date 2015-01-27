/*globals CodeRacer, Backbone */
CodeRacer.Collections.Stats = Backbone.Collection.extend({
  model: CodeRacer.Models.Stat,
  url: '/api/stats'
});
