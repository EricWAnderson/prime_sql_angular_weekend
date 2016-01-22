var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
   $routeProvider
       .when('/addresses', {
            templateUrl: 'views/addresses.html',
            controller: 'addressesController'
       })
       .when('/orders', {
            templateUrl: 'views/orders.html',
            controller: 'ordersController'
       });
}]);

app.controller('mainController', ['$scope', '$location', 'addressService', function($scope, $location, addressService){
    $scope.hello = 'hello world';
    $scope.data = addressService.data;

    //used for nav buttons active class
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    //used for addresses dropdown
    addressService.users();


    $scope.addresses = addressService.addresses;

    $scope.selectedUser = null;

    //used for user selection

}]);

app.controller('addressesController', ['$scope', function($scope){}]);
app.controller('ordersController', ['$scope', function($scope){}]);

app.factory('addressService', ['$http', function($http){
    var data = {};

    var users = function(){
        $http.get('/user').then(function(response){
            data.users = response.data;
            console.log(data.users);
        })
    };

    var addresses = function(user){
        var id = user.id;

        console.log('hit the addresses function', id);

        $http.get('/user/' + id).then(function(response){
            data.addresses = response.data;
            console.log(data.addresses);
        })
    };

    return {
        addresses: addresses,
        users: users,
        data: data
    }
}]);