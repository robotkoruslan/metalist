export default class PriceSchemaController {

  constructor(PriceSchemaService, StadiumMetalist, StadiumDinamo) {
    'ngInject';
    this.stadium = StadiumMetalist;
    this.priceSchemaService = PriceSchemaService;

    this.stadiumName = '';

    this.priceSchemas = [];
    this.currentPriceSchema = {};
    this.currentTribune = {};
    this.currentSector = {};
    this.message = '';
    this.colors = [
      {color: '#8b54aa', colorName: 'violet'},
      {color: '#ffcc00', colorName: 'yellow'},
      {color: '#6f89c0', colorName: 'blue'},
      {color: '#54aa6a', colorName: 'green'},
      {color: '#ff972f', colorName: 'orange'}
    ];

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

  edit(schema) {
    this.currentPriceSchema = schema;
  }

  selectTribune(tribune) {
    this.currentTribune.name = tribune;
    this.currentSector.name = null;
  }

  getSectorForSetPrice($event) {
    let priceSchema = this.currentPriceSchema,
      tribuneName = $event.tribune,
      sectorNumber = $event.sector;

    this.message = '';
    // this.currentTribune.name = null;

    if (!priceSchema['tribune_' + tribuneName]) {
      this.currentTribune = this.stadium['tribune_' + tribuneName];
      this.currentSector = this.stadium['tribune_' + tribuneName]['sector_' + sectorNumber];
    } else {
      this.currentTribune = priceSchema['tribune_' + tribuneName];

      if (!priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber]) {
        this.currentSector = this.stadium['tribune_' + tribuneName]['sector_' + sectorNumber];
      } else {
        this.currentSector = priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber];
      }
    }
  }

  getSectorsFill(tribuneName, sectorNumber) {
    let defaultColor = '#808080',
      priceSchema = this.currentPriceSchema,
      price = this.priceSchemaService.getPriceBySector(tribuneName, sectorNumber, priceSchema);

    if (!price) {
      return defaultColor;
    } else {
      return this.priceSchemaService.getColorByPrice(price);
    }
  }

  getPreparedPriceSchema(tribuneName, sectorNumber) {

    let priceSchema = this.currentPriceSchema,
      tribune = this.currentTribune,
      sector = this.currentSector

    if (!priceSchema.colorSchema) {priceSchema.colorSchema = []}

    delete sector.rows;

    if (priceSchema['tribune_' + tribuneName] && priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber]) {
      return priceSchema;
    }

    if (priceSchema['tribune_' + tribuneName] && !priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber]) {
      priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber] = sector;
      return priceSchema;
    }

    if (!priceSchema['tribune_' + tribuneName]) {
      priceSchema['tribune_' + tribuneName] = {};
      priceSchema['tribune_' + tribuneName].name = tribune.name;
      priceSchema['tribune_' + tribuneName].price = tribune.price;
      if (sector.name){priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber] = sector; }

      return priceSchema;
    }
  }

  savePriceSchema(form, tribuneName, sectorNumber) {
    form.$setDirty();
    //form.schemaName.$setDirty();
    //form.tribunePrice.$setDirty();
    //form.sectorPrice.$setDirty();

    if (!tribuneName && !sectorNumber) {
      this.message = 'Выберите сектор или трибуну.';
      return;
    }
    if (this.currentPriceSchema.newName ) {
      this.currentPriceSchema.name = this.currentPriceSchema.newName;
      this.currentPriceSchema.newName = undefined;
    }
    if (!this.currentPriceSchema.name) {
      this.message = 'Укажите имя схемы.';
      return;
    }

    if (form.$valid) {
      let priceSchema = this.getPreparedPriceSchema(tribuneName, sectorNumber);
      this.priceSchemaService.savePriceSchema(priceSchema)
        .then(response => {
          this.currentPriceSchema = response.data.priceSchema;
          this.currentTribune = {};
          this.currentSector = {};
          this.loadPriceSchemas();
        });
    }
  }

}