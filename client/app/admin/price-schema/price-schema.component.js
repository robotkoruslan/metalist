import template from './price-schema.html';

let priceSchemaComponent = {
  templateUrl: template,
  controller: class PriceSchemaController {

    constructor(PriceSchemaService, StadiumMetalist, DefaultPriceColor) {
      'ngInject';
      this.stadium = StadiumMetalist;
      this.priceSchemaService = PriceSchemaService;
      this.defaultPriceColor = DefaultPriceColor;

      this.stadiumName = '';
      this.priceSchemas = [];
      this.sourcePriceSchema = {};
      this.currentPriceSchema = {};
      this.colors = this.priceSchemaService.colors;
    }

    $onInit() {
      this.loadPriceSchemas();
    }

    loadPriceSchemas() {
      this.priceSchemaService.loadPrices()
        .then(response => {
          this.priceSchemas = response.data;
        });
    }

    changeSchema() {
      this.currentPriceSchema = angular.copy(this.currentPriceSchema);
    }

    edit(schema) {
      if (schema) {
        this.sourcePriceSchema = angular.copy(schema.priceSchema);
        this.currentPriceSchema = angular.copy(this.sourcePriceSchema);
      }
    }

    savePriceSchema() {

      this.priceSchemaService.updateColorSchema(this.currentPriceSchema);
      this.priceSchemaService.savePriceSchema(this.currentPriceSchema)
        .then(response => {
          this.edit(response.data);
          this.loadPriceSchemas();
        });

    }

    changeColor($event) {
      this.currentPriceSchema.colorSchema = $event.colorSchema;
      this.currentPriceSchema = angular.copy(this.currentPriceSchema);
    }


    clickApply($event) {
      this.currentPriceSchema = angular.copy($event.currentPriceSchema);
      this.currentPriceSchema = this.priceSchemaService.updateColorSchema(this.currentPriceSchema);
    }

    isSchemaChanged() {
      return !angular.equals(this.currentPriceSchema, this.sourcePriceSchema)
    }

  }
};

export default priceSchemaComponent;