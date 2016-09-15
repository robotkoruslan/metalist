'use strict';

(function () {

    class TicketController {

        constructor($http) {
            this.$http = $http;
            this.tickets = [];
            this.$http.get('/api/tickets')
                .then(response => {
                    this.tickets = response.data;
                });
        }

    }

    angular.module('metallistTicketsApp')
        .controller('TicketController', TicketController);
})();
