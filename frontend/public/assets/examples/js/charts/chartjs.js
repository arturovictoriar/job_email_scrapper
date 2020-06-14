(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/charts/chartjs', ['jquery', 'Site'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('jquery'), require('Site'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.jQuery, global.Site);
    global.chartsChartjs = mod.exports;
  }
})(this, function (_jquery, _Site) {
  'use strict';

  var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

  (0, _jquery2.default)(document).ready(function ($$$1) {
    (0, _Site.run)();
  });

  Chart.defaults.global.responsive = true;


  // Example Chartjs Pie
  // -------------------
  (function () {
    var pieData = {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: [Config.colors("red", 400), Config.colors("green", 400), Config.colors("yellow", 400)],
        hoverBackgroundColor: [Config.colors("red", 600), Config.colors("green", 600), Config.colors("yellow", 600)]
      }]
    };

    var myPie = new Chart(document.getElementById("exampleChartjsPie").getContext("2d"), {
      type: 'pie',
      data: pieData,
      options: {
        responsive: true
      }
    });
  })();


});
