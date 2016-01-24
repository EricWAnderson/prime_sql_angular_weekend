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

app.controller('mainController', ['$scope', '$location', 'databaseService', function($scope, $location, databaseService){
    $scope.hello = 'hello world';
    $scope.data = databaseService.data;

    //used for nav buttons active class
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    //used for addresses dropdown
    databaseService.users();


    $scope.addresses = databaseService.addresses;
    $scope.orderLookup = databaseService.orderLookup;

    $scope.selectedUser = null;

    //used for user selection

}]);

app.controller('addressesController', ['$scope', 'databaseService', function($scope, databaseService){
    databaseService.data.orderLookupBoolean = false;
}]);
app.controller('ordersController', ['$scope', 'databaseService', function($scope, databaseService){
    databaseService.data.addressLookupBoolean = false;
}]);

app.factory('databaseService', ['$http', function($http){
    var data = {};
    data.orderLookupBoolean = false;
    data.addressLookupBoolean = false;

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
            data.addressLookupBoolean = true;
            data.addresses = response.data;
        })
    };

    var orderLookup = function(user, dateStart, dateEnd){
        var id = user.id;

        console.log('hit the orderLookup function', id);

        $http.get('/user/orderLookup/' + id + '/' + dateStart + '/' + dateEnd).then(function(response){
            data.orderLookupBoolean = true;
            data.orderLookup = response.data;

            //calculate order total
            data.orderTotal = 0;
            for(var i = 0; i<data.orderLookup.length; i++){
                data.orderTotal += parseFloat(data.orderLookup[i].amount);
            }
        })
    };

    return {
        orderLookup: orderLookup,
        addresses: addresses,
        users: users,
        data: data
    }
}]);