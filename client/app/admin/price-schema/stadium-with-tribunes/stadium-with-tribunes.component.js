import template from './stadium-with-tribunes.html';

let stadiumWithTribunesComponent = {
  bindings: {
    currentPrice: '<',
    onChangeSchema: '&',
    onTribuneSelected: '&',
    onSectorSelected: '&'
  },
  templateUrl: template,
  controller: class StadiumWithTribunesController {
    constructor() {
      'ngInject';
    }

  $onChanges(changes) {
    if (this.currentPrice) {
      angular.copy(this.currentPrice, this.currentPriceSchema);
    }
  }

  $onInit() {
      this.currentPriceSchema = {}
  }

  changePriceSchema() {
    this.onChangeSchema({
      $event: {
        currentPriceSchema: this.currentPriceSchema
      }
    });
  }

  selectTribune(tribuneName) {
    this.onTribuneSelected({
      $event: {
          tribuneName: tribuneName
      }
    });
  }

  getSectorForSetPrice(sectorShema) {
    this.onSectorSelected({
      $event: {
          sectorShema: sectorShema
      }
    });
  }

  }
};

export default stadiumWithTribunesComponent;