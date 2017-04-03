"use strict";
let app = angular.module("DegreeConverter", []);
app.controller("app", ["$scope", "$http", function($scope, $http) {


  $scope.convert = function($event) {
  switch ($event.target.getAttribute('ng-model')) {
   case "celsius":
    console.log(`Requesting c2f with value ${$scope.celsius}`);
    $http.get(`/c2f/${$scope.celsius}`).then(function(res) {
     $scope.fahrenheit = res.data.fahrenheit;
    });
    break;
   case "fahrenheit":
    console.log(`Requesting f2c with value ${$scope.fahrenheit}`);
    $http.get(`/f2c/${$scope.fahrenheit}`).then(function(res) {
     $scope.celsius = res.data.celsius;
    });
    break;
  }
 };
}]);
