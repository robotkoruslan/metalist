'use strict';

(function () {

    class TicketController {

        constructor($http, $timeout) {
            this.$http = $http;
            this.$timeout = $timeout;
            this.tickets = [];
            this.statuses = {};

            this.reloadTickets();
        }

        buyTicket(ticket) {

            this.$http.post('/api/tickets/' + ticket._id + '/buy')
                .then(() => {

                    this.statuses[ticket._id] = {
                        type: 'success',
                        message: 'Bought successfully'
                    };
                    this.reloadTickets();
                    this.$timeout(() => {

                        this.statuses[ticket._id] = {};
                    }, 2000);

                });
        }

        reloadTickets() {
            this.$http.get('/api/tickets')
                .then(response => {
                    this.tickets = response.data;
                });
        }

    }

    angular.module('metallistTicketsApp')
        .controller('TicketController', TicketController);
})();
