import template from './cart-details.html';

class CartDetailsController {

  constructor(CartService) {
    'ngInject';
    this.cartService = CartService;
  }

  removeSeat(slug, matchId) {
    this.cartService.removeSeatFromCart(slug, matchId)
      .then(() => {
        this.onDelete({$event: { slug: slug, matchId: matchId }});
      });
  }
}

let cartDetailsComponent = {
  templateUrl: template,
  controller: CartDetailsController,
  bindings: {
    onDelete: '&'
  }
};

export default cartDetailsComponent;