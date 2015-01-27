/*globals CodeRacer, Backbone, JST */
CodeRacer.Views.StatsDetail = Backbone.View.extend({
  template: JST['stats/detail'],

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.installChart);
  },

  installChart: function () {
    var ctx = this.$("#wpmChart").get(0).getContext("2d");
    var myNewChart = new Chart(ctx).Line(this.data());
  },

  data: function () {
    var _data = this.collection.map(function (stat) {
      return stat.get(1);
    });
    var _labels = this.collection.map(function (stat) {
      return moment(stat.get(0)).format('MM/DD');
    });
    var _dataSets = {
      labels: _labels,
      datasets: [{
        label: "My WPM",
        fillColor: "rgba(24, 188, 156, 0.2)",
        strokeColor: "rgba(24,188,156,1)",
        pointColor: "rgba(24, 188, 156,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(124,188,156,1)",
        data: _data
      }]
    };
    return _dataSets;
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    if (this.collection.any()) {
      this.installChart();
    }

    return this;
  },
});
