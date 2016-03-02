angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('SensorsCtrl', function($scope, Sensors) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.sensors = Sensors.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('SensorDetailCtrl', function($scope, $stateParams, $http, Sensors) {
  $scope.sensor = Sensors.get($stateParams.sensorId);

  $http.get("https://api.smartcitizen.me/v0/devices/" + $scope.sensor.id)
    .success(function(response){
      console.log(response);
      $scope.sensor.response = response;
    });
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
