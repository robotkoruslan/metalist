import template from './order-details.html';

class OrderDetailsController {

  constructor(CartService) {
    'ngInject';
    this.cartService = CartService;
  }

  $onInit() {
    this.order = {};
    this.privateId = '';
    this.message = '';
  }

  getOrder() {
    this.order = {};
    this.message = '';

    this.cartService.getOrderByPrivateId(this.privateId)
      .then( response => this.order = response.data )
      .catch(err => {
        if(err.status === 404) {
          this.message = 'Ордер не найден.';
        }
      });
  }
}


let orderDetailsComponent = {
  templateUrl: template,
  controller: OrderDetailsController
};

export default orderDetailsComponent;
