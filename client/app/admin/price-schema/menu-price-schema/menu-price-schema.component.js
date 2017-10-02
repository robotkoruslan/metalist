import template from './menu-price-schema.html';

let menuPriceSchemaComponent = {
  bindings: {
    priceSchemas: '<',
    onEdit: '&'
  },
  templateUrl: template,
  controller: class MenuPriceSchemaController {
    constructor() {
      'ngInject';
    }

  $onChanges(changes) {
    if ( changes.priceSchemas ) {
      this.priceSchemas = angular.copy(this.priceSchemas);
    }
  }

  $onInit() {
  }

  edit(priceSchema) {
    this.onEdit({
      $event: {
          priceSchema: priceSchema
      }
    });
  }

  }
};

export default menuPriceSchemaComponent;