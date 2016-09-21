angular.module("simu",[])
.controller("SimuCtrl",["$scope",function ($scope) {
	$scope.input={};
	$scope.input.sc1 = {
		val : 0,
		min : 0,
		max : 30,
		step : 0.5
	}
	$scope.input.sc2 = {
		val : 0,
		min : 0,
		max : 30,
		step : 0.5
	}
	$scope.input.sc3 = {
		val : 0,
		min : 0,
		max : 30,
		step : 0.5
	}
	$scope.output = {
		o1:0,
		o2:0,
		o3:0,
		o4:0,
		o5:0,
		o6:0,
		o7:0,
		o8:0,
		o9:0,
		o10:0
	}
}]);
var lineChartData = {
	labels : ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio"],
	datasets : [
		{
			label: "Primera serie de datos",
			fillColor : "rgba(220,220,220,0.2)",
			strokeColor : "#6b9dfa",
			pointColor : "#1e45d7",
			pointStrokeColor : "#fff",
			pointHighlightFill : "#fff",
			pointHighlightStroke : "rgba(220,220,220,1)",
			data : [10,30,40,45,40,30,50,80]
		}
		// {
		// 	label: "Segunda serie de datos",
		// 	fillColor : "rgba(151,187,205,0.2)",
		// 	strokeColor : "#e9e225",
		// 	pointColor : "#faab12",
		// 	pointStrokeColor : "#fff",
		// 	pointHighlightFill : "#fff",
		// 	pointHighlightStroke : "rgba(151,187,205,1)",
		// 	data : [40,50,70,40,85,55,15]
		// }
	]
}
var ctx4 = document.getElementById("chart-area4").getContext("2d");
var canva = new Chart(ctx4).Line(lineChartData, {responsive:true});
document.getElementById("chart-area4").onclick = function(evt){
 var activePoints = canva.getPointsAtEvent(evt);
 var firstPoint = activePoints[0];
 if (firstPoint !== undefined)
		 alert(firstPoint.value);
};
