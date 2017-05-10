export default class MatchController {

  constructor(match, cart, $state) {
    'ngInject';
    this.$state = $state;

    this.match = match;
    this.cart = cart;
    this.priceSchema = this.match.priceSchema.priceSchema;
  }

  goToSector($event) {
    if ($event.price) {
      this.$state.go('main.sector', {id: this.match.id, tribune: $event.tribune, sector: $event.sector});
    }
  }

}
