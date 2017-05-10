import template from './cart.html';

class CartController {

  constructor(CartService) {
    'ngInject';
    this.cartService = CartService;
  }

  removeSeat(slug) {
    this.cartService.removeSeatFromCart(slug)
      .then(() => {
        this.onDelete({$event: {slug: slug}});
      });
  }
}

let cartComponent = {
  templateUrl: template,
  controller: CartController,
  bindings: {
    onDelete: '&'
  }
};

export default cartComponent;