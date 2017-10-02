export default class PriceSchemaController {

  constructor(PriceSchemaService, StadiumMetalist, DefaultPriceColor) {
    'ngInject';
    this.stadium = StadiumMetalist;
    this.priceSchemaService = PriceSchemaService;
    this.defaultPriceColor = DefaultPriceColor;

    this.stadiumName = '';
    this.applyShema = false;
    this.priceSchemas = [];
    this.tempPriceSchema = {};
    this.currentPriceSchema = {};
    this.currentTribune = {};
    this.currentSector = {};
    this.message = '';
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

  changePrice($event) {
    this.currentTribune = angular.copy($event.currentTribune);
    this.currentSector = angular.copy($event.currentSector);
    if (this.currentPriceSchema.newName) {
      this.currentPriceSchema.name = this.currentPriceSchema.newName;
      this.currentPriceSchema.newName = undefined;
    }
    this.currentPriceSchema = this.getPreparedPriceSchema(this.currentTribune.name, this.currentSector.name);
    this.buttonStatus(this.currentPriceSchema, this.tempPriceSchema, this.priceSchemas);

  }

  edit(schema) {
    if (schema) {
      this.tempPriceSchema = angular.copy(schema.priceSchema);
      this.currentPriceSchema = angular.copy(this.tempPriceSchema);
      this.currentTribune = {};
      this.currentSector = {};
      this.applyShema = false;
      this.applyPriceSchema = false;
    }
  }

  selectTribune(tribuneName) {
    if (this.tempPriceSchema.name) {
      angular.copy(this.tempPriceSchema, this.currentPriceSchema);
    }
    if (!this.tempPriceSchema.name) {
      angular.copy(this.currentPriceSchema, this.tempPriceSchema);
    }
    if (this.currentPriceSchema['tribune_' + tribuneName]) {
      this.currentTribune = angular.copy(this.currentPriceSchema['tribune_' + tribuneName]);
    } else {
      this.currentTribune.name = tribuneName;
      this.currentTribune = angular.copy(this.currentTribune);
    }
    this.currentSector = {};
  }

  getSectorForSetPrice($event) {
    if (this.tempPriceSchema.name) {
      angular.copy(this.tempPriceSchema, this.currentPriceSchema);
    }
    if (!this.tempPriceSchema.name) {
      angular.copy(this.currentPriceSchema, this.tempPriceSchema);
    }
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

  getPreparedPriceSchema(tribuneName, sectorNumber) {

    let priceSchema = this.currentPriceSchema,
      tribune = this.currentTribune,
      sector = this.currentSector;

    if (!priceSchema.colorSchema) {
      priceSchema.colorSchema = []
    }

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

  savePriceSchema(tribuneName, sectorNumber) {

    if (this.currentPriceSchema.newName) {
      this.currentPriceSchema.name = this.currentPriceSchema.newName;
      this.currentPriceSchema.newName = undefined;
    }
    if (!this.currentPriceSchema.name) {
      this.message = 'Укажите имя схемы.';
      return;
    }

    let priceSchema = this.getPreparedPriceSchema(tribuneName, sectorNumber);
    this.priceSchemaService.updateColorSchema(priceSchema);
    this.priceSchemaService.savePriceSchema(priceSchema)
      .then(response => {
        this.edit(response.data);
        this.currentTribune = {};
        this.currentSector = {};
        this.loadPriceSchemas();
      });

    this.message = '';
  }

  clickApply() {
    this.currentPriceSchema = angular.copy(this.priceSchemaService.updateColorSchema(this.currentPriceSchema));
    angular.copy(this.currentPriceSchema, this.tempPriceSchema);
    this.buttonStatus(this.currentPriceSchema, this.tempPriceSchema, this.priceSchemas);
    this.currentTribune = {};
    this.currentSector = {};
  }

  changeColor($event) {
    this.currentPriceSchema.colorSchema = $event.colorSchema;
    this.currentPriceSchema = angular.copy(this.currentPriceSchema);
    this.tempPriceSchema = angular.copy(this.currentPriceSchema);
    this.buttonStatus(this.currentPriceSchema, this.tempPriceSchema, this.priceSchemas);
  }

  changeSchema($event) {
    this.currentPriceSchema = angular.copy($event.currentPriceSchema);
    this.tempPriceSchema = angular.copy(this.currentPriceSchema);
    this.buttonStatus(this.currentPriceSchema, this.tempPriceSchema, this.priceSchemas);
  }

  buttonStatus(currentPriceSchema, tempPriceSchema, priceSchemas) {
    if (!angular.equals(currentPriceSchema, tempPriceSchema)) {
      this.applyShema = true;
    } else {
      this.applyShema = false;
    }
    for (let schema in priceSchemas) {
      if (priceSchemas[schema].priceSchema.name == tempPriceSchema.name) {
        if (!angular.equals(priceSchemas[schema].priceSchema, tempPriceSchema)) {
          return this.applyPriceSchema = true;
        } else {
          return this.applyPriceSchema = false;
        }
      }
    }
    return this.applyPriceSchema = true;
  }

}