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
      if (changes.priceSchemas) {
        this.priceSchemas = angular.copy(this.priceSchemas);
      }
    }

    edit(priceSchemas) {
      //@TODO remove id assigning after priceSchema refactoring
      this.priceSchema = priceSchemas.priceSchema;
      if (!priceSchemas.priceSchema.id) {
        this.priceSchema.id = priceSchemas.id;
      }
      this.onEdit({
        $event: {
          priceSchema: this.priceSchema
        }
      });
    }

  }
};

export default menuPriceSchemaComponent;