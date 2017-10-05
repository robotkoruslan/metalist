import template from './stadium-with-tribunes.html';

let stadiumWithTribunesComponent = {
  bindings: {
    currentPrice: '<',
    stadium: '<',
    onClickApply: '&'
  },
  templateUrl: template,
  controller: class StadiumWithTribunesController {
    constructor() {
      'ngInject';
    }

    $onChanges(changes) {
      if (this.currentPrice) {
        this.currentPriceSchema = angular.copy(this.currentPrice);
        this.stadium = angular.copy(this.stadium);
        this.currentTribune = {};
        this.currentSector = {};

      }
    }

    $onInit() {
      this.currentPriceSchema = {}
    }

    clickApply($event) {
      this.onClickApply({
        $event: {
          currentPriceSchema: $event.currentPriceSchema
        }
      });
    }

    selectTribune(tribuneName) {

      if (this.currentPriceSchema['tribune_' + tribuneName]) {
        this.currentTribune = angular.copy(this.currentPriceSchema['tribune_' + tribuneName]);
      } else {
        this.currentTribune.name = tribuneName;
        this.currentTribune = angular.copy(this.currentTribune);
      }
      this.currentSector = {};
    }

    getSectorForSetPrice($event) {

      let priceSchema = this.currentPriceSchema,
        tribuneName = $event.tribune,
        sectorNumber = $event.sector;

      if (!priceSchema['tribune_' + tribuneName]) {
        this.currentTribune = Object.assign({}, this.stadium['tribune_' + tribuneName]);
        this.currentSector = Object.assign({}, this.stadium['tribune_' + tribuneName]['sector_' + sectorNumber]);
      } else {
        this.currentTribune = priceSchema['tribune_' + tribuneName];

        if (!priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber]) {
          this.currentSector = Object.assign({}, this.stadium['tribune_' + tribuneName]['sector_' + sectorNumber]);
        } else {
          this.currentSector = priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber];
        }
      }
    }

  }
};

export default stadiumWithTribunesComponent;