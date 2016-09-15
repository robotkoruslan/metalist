'use strict';

angular.module('metallistTicketsApp')
    .config(function ($stateProvider) {
        $stateProvider.state('ticket', {
            url: '/tickets',
            templateUrl: 'app/ticket/ticket.html',
            controller: 'TicketController',
            controllerAs: 'controller',
            authenticate: true
        });
    });
