'use strict';

(function () {

    class CartController {

        constructor(CartService) {
            this.cart = CartService.cart;
            this.removeItem = CartService.removeItem.bind(CartService);
        }
    }

    angular.module('metalistTicketsApp')
        .component('cart', {
            templateUrl: 'app/cart/cart.html',
            controller: CartController,
            controllerAs: 'vm'
        });
})();
