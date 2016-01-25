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
    //sync databaseService data object to $scope
    $scope.data = databaseService.data;

    //used for nav buttons active class
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    //used to obtain users for addresses dropdown
    databaseService.users();

    //functions to call when user is selected, on either the addresses page or the orderLookup page
    $scope.addresses = databaseService.addresses;
    $scope.orderLookup = databaseService.orderLookup;

    $scope.selectedUser = null;

}]);

app.controller('addressesController', ['$scope', 'databaseService', function($scope, databaseService){
    //reset the orderLookup view in case it is viewed again
    databaseService.data.orderLookupBoolean = false;
}]);
app.controller('ordersController', ['$scope', 'databaseService', function($scope, databaseService){
    //reset the addressLookup view in case it is viewed again
    databaseService.data.addressLookupBoolean = false;
}]);

//Service that makes http calls to node/postgres
app.factory('databaseService', ['$http', function($http){
    var data = {};
    data.orderLookupBoolean = false;
    data.addressLookupBoolean = false;

    var users = function(){
        $http.get('/user').then(function(response){
            data.users = response.data;
        })
    };

    var addresses = function(user){
        var id = user.id;

        $http.get('/user/' + id).then(function(response){
            data.addressLookupBoolean = true;
            data.addresses = response.data;
        })
    };

    var orderLookup = function(user, dateStart, dateEnd){
        var id = user.id;

        $http.get('/user/orderLookup/' + id + '/' + dateStart + '/' + dateEnd).then(function(response){
            data.orderLookupBoolean = true;
            data.orderLookup = response.data;

            //calculate order total
            data.orderTotal = 0;
            for(var i = 0; i<data.orderLookup.length; i++){
                data.orderTotal += parseFloat(data.orderLookup[i].amount);
            }
            data.orderTotal = data.orderTotal.toFixed(2);
        })
    };

    return {
        orderLookup: orderLookup,
        addresses: addresses,
        users: users,
        data: data
    }
}]);