var lineChartData = {
    "datasets": [{
        "data": [
            "85",
            "87",
            "70",
            "80",
            "78",
            "100",],
            "pointStrokeColor": "#1A81C5",
            "fillColor": "rgba(254, 254, 254, 0.4)",
            "pointColor": "#1A81C5",
            "strokeColor": "#5D9CC6"
    }],
        "labels": [
        "10",
        "20",
        "30",
        "40",
        "50",
        "60"],
};

var options = {showTooltips: true};

Chart.types.Line.extend({
    name: "LineAlt",
    highlightPoints: function(datasetIndex, pointIndexArray){
        var activePoints = [];
        var points = this.datasets[datasetIndex].points;
        for(i in pointIndexArray){
        	if(points[pointIndexArray[i]]){
          	activePoints.push(points[pointIndexArray[i]]);
          }
        }
        this.showTooltip(activePoints);
    }
});

var myLine = new Chart(document.getElementById("canvas").getContext("2d")).LineAlt(lineChartData, options);

var highlight = function(index){
	myLine.highlightPoints(0, [index]);
}
$("#slider").slider({
  max: lineChartData.datasets[0].data.length-1,
  slide: function( event, ui ) { highlight(ui.value); },
});

// var lineChartData = {
//     labels: ["January", "February", "March", "April", "May", "June", "July"],
//     datasets: [
//         {
//             label: "My First dataset",
//             fill: false,
//             backgroundColor: "rgba(220,220,220,0.2)",
//             borderColor: "rgba(220,220,220,1)",
//             borderCapStyle: 'butt',
//             borderDash: [],
//             borderDashOffset: 0.0,
//             borderJoinStyle: 'miter',
//             pointBorderColor: "rgba(220,220,220,1)",
//             pointBackgroundColor: "#fff",
//             pointBorderWidth: 1,
//             pointHoverRadius: 5,
//             pointHoverBackgroundColor: "rgba(220,220,220,1)",
//             pointHoverBorderColor: "rgba(220,220,220,1)",
//             pointHoverBorderWidth: 2,
//             tension: 0.1,
//             data: [65, 59, 80, 81, 56, 55, 40]
//         },
//         {
//             label: "My Second dataset",
//             fill: true,
//             backgroundColor: "rgba(220,220,220,0.2)",
//             borderColor: "rgba(220,220,220,1)",
//             pointBorderColor: "rgba(220,220,220,1)",
//             pointBackgroundColor: "#fff",
//             pointBorderWidth: 1,
//             pointHoverRadius: 5,
//             pointHoverBackgroundColor: "rgba(220,220,220,1)",
//             pointHoverBorderColor: "rgba(220,220,220,1)",
//             pointHoverBorderWidth: 2,
//             data: [28, 48, 40, 19, 86, 27, 90]
//         }
//     ]
//   };
//
// var options = {showTooltips: true};
//
// Chart.types.Line.extend({
//     name: "LineAlt",
//     highlightPoints: function(datasetIndex, pointIndexArray){
//         var activePoints = [];
//         var points = this.datasets[datasetIndex].points;
//         for(i in pointIndexArray){
//         	if(points[pointIndexArray[i]]){
//           	activePoints.push(points[pointIndexArray[i]]);
//           }
//         }
//         this.showTooltip(activePoints);
//     }
// });
//
// var myLine = new Chart(document.getElementById("canvas").getContext("2d")).LineAlt(lineChartData, options);
//
// var highlight = function(index){
// 	myLine.highlightPoints(0, [index]);
// }
//
// $("#slider").slider({
//   max: lineChartData.datasets[0].data.length-1,
//   slide: function( event, ui ) { highlight(ui.value); },
// });
