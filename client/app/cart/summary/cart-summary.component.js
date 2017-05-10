import template from './cart-summary.html';

class CartSummaryController {

    constructor(CartService) {
      'ngInject';
      this.cart = {};
      this.cartService = CartService;
    }

    getPrice() {
      if (this.isCartLoaded()) {
        return this.cart.seats.reduce((price, seat) => {
          return price + seat.price;
        }, 0);
      }
    }

    getSize() {
      return this.cartService.getMyCartSize();
    }

    isCartLoaded() {
      this.cart = this.cartService.getMyCart();
      return this.cart.seats;
    }
  }

let cartSummaryComponent = {
  templateUrl: template,
  controller: CartSummaryController,
  controllerAs: 'vm'
};

export default cartSummaryComponent;