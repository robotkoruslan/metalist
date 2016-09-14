'use strict';

angular.module('metallistTicketsApp')
    .directive('navbar', () => ({
        templateUrl: 'components/navbar/navbar.html',
        restrict: 'E',
        controller: 'NavbarController',
        controllerAs: 'nav'
    }));
