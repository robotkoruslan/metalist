'use strict';

angular.module('metallistTicketsApp')
    .config(function ($stateProvider) {
        $stateProvider.state('buy', {
            url: '/buy',
            templateUrl: 'app/buy/buy.html',
            controller: 'BuyController',
            controllerAs: 'buy',
            authenticate: true
        });
    });
