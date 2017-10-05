import template from './price-editor.html';

let priceEditorComponent = {
  bindings: {
    currentPrice: '<',
    currentTribune: '<',
    currentSector: '<',
    onClickApply: '&'
  },
  templateUrl: template,
  controller: class PriceEditorController {
    constructor() {
      'ngInject';
    }

    $onChanges(changes) {
      if (changes.currentTribune) {
        this.currentTribune = angular.copy(this.currentTribune);
        this.currentSector = angular.copy(this.currentSector);
        this.sourcePriceSchema = angular.copy(this.currentPrice);
        this.currentPriceSchema = angular.copy(this.sourcePriceSchema);
      }
    }


    changePrice() {
      this.currentTribune = angular.copy(this.currentTribune);
      this.currentSector = angular.copy(this.currentSector);
      this.currentPriceSchema = this.getPreparedPriceSchema(this.currentTribune.name, this.currentSector.name);

    }

    clickApply() {
      this.onClickApply({
        $event: {
          currentPriceSchema: this.currentPriceSchema
        }
      });
      this.sourcePriceSchema = angular.copy(this.currentPriceSchema);
      this.currentTribune = {};
      this.currentSector = {};
    }

    isPriceChanged(){
      return !angular.equals(this.currentPriceSchema, this.sourcePriceSchema)
    }

    getPreparedPriceSchema(tribuneName, sectorNumber) {

      let priceSchema = this.currentPriceSchema,
        tribune = this.currentTribune,
        sector = this.currentSector;

      delete sector.rows;

      if (sector.price == null && sector.name) {
        delete priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber];
        return priceSchema;
      }

      if (priceSchema['tribune_' + tribuneName] && priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber]) {
        priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber].price = sector.price;
        return priceSchema;
      }

      if (priceSchema['tribune_' + tribuneName] && !priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber] && sectorNumber) {
        priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber] = sector;
        return priceSchema;
      }

      if (!priceSchema['tribune_' + tribuneName]) {
        priceSchema['tribune_' + tribuneName] = {};
        priceSchema['tribune_' + tribuneName].name = tribune.name;
      }

      if (tribune.price) {
        priceSchema['tribune_' + tribuneName].price = tribune.price;
        return priceSchema;
      }

      if (priceSchema['tribune_' + tribuneName].price && !tribune.price) {
        delete priceSchema['tribune_' + tribuneName].price;
        return priceSchema;
      } else {
        return priceSchema;
      }
    }

  }
};

export default priceEditorComponent;