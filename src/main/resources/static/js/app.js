var app = angular.module('myapp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'DeviceController'
        })

        // route for the about page
        .when('/devices', {
            templateUrl : 'pages/devices.html',
            controller  : 'aboutController'
        })

        // route for the contact page
        .when('/commands', {
            templateUrl : 'pages/commands.html',
            controller  : 'contactController'
        });
});


app.controller('DeviceControl', function ($scope, $http) {

    $scope.discover = {};


    $scope.discover.doClick = function (item, event) {
        var responsePromise = $http.get("/rest/connection/discover/usb");

        responsePromise.success(function (data, status, headers, config) {
            $scope.discover.fromServer = data;
        });

        responsePromise.error(function (data, status, headers, config) {
            alert("AJAX failed!");
        });
    };

    $scope.discover.saveDevice = function(device) {
        var responsePromise = $http.put("/rest/data/device/add", device);

        responsePromise.success(function (data, status, headers, config) {
            $scope.devices.getAll();
        });

        responsePromise.error(function (data, status, headers, config) {
            alert("Adding Device failed!");
        });


    };

    $scope.devices = {};

    $scope.devices.getAll = function() {
        var responsePromise = $http.get("/rest/data/device/all");

        responsePromise.success(function (data, status, headers, config) {
            $scope.devices.list = data;
        });

        responsePromise.error(function (data, status, headers, config) {
            alert("AJAX failed!");
        });

    };

    $scope.devices.getAll();

    $scope.devices.removeDevice = function(deviceName) {
        var responsePromise = $http.post("/rest/data/device/remove", deviceName);

        responsePromise.success(function (data, status, headers, config) {
            $scope.devices.getAll();
        });

        responsePromise.error(function (data, status, headers, config) {
            alert("AJAX failed!");
        });

    };


});





