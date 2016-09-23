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
