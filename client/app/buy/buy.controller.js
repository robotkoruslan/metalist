'use strict';

(function () {

    class BuyController {

        constructor($http) {
            this.seats = [
                {
                    id: 1,
                    text: "Seat #1",
                    available: true
                },{
                    id: 2,
                    text: "Seat #2",
                    available: false
                },{
                    id: 3,
                    text: "Seat #3",
                    available: true
                },{
                    id: 4,
                    text: "Seat #4",
                    available: false
                },
            ];
        }

        // $onInit() {
        //     this.$http.get('/api/things')
        //         .then(response => {
        //             this.awesomeThings = response.data;
        //         });
        // }

    }

    angular.module('metallistTicketsApp')
        .controller('BuyController', BuyController);
})();
