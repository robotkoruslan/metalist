export default class PriceSchemaController {

  constructor(PriceSchemaService, StadiumMetalist, StadiumDinamo) {
    'ngInject';
    this.stadium = StadiumMetalist;
    this.priceSchemaService = PriceSchemaService;

    this.stadiumName = '';

    this.priceSchemas = [];
    this.currentPriceSchema = {};
    this.currentTribune = {};
    this.currentTribune.color = '#808080';
    this.currentSector = {};
    this.currentSector.color = '#808080';
    this.message = '';
    //this.priceSchemaId = '';
    this.colors = [
      {color: '#8b54aa', colorName: 'violet'},
      {color: '#ffcc00', colorName: 'yellow'},
      {color: '#6f89c0', colorName: 'blue'},
      {color: '#54aa6a', colorName: 'green'},
      {color: '#ff972f', colorName: 'orange'}
    ];
    this.currentColorSchema = {};
    this.currentTribuneColor = {};
    this.currentSectorColor = {};

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
    console.log('edit', schema);
    this.currentPriceSchema = schema;
  }

  selectTribune(tribune) {
    console.log('selectTribune', tribune);
    this.currentTribune.name = tribune;
    this.currentSector.name = null;
  }

  setCurrentPriceSchema(schemaName) {
    console.log('setCurrentPriceSchema', schemaName);
    this.currentTribune = {};
    this.currentSector = {};

    if (schemaName === '---New Schema---') {
      this.currentPriceSchema = {};
    } else {
      let currentPriceSchema = this.priceSchemas.filter(schema => schema.priceSchema.name === schemaName)[0];
      this.priceSchemaId = currentPriceSchema.id;
      this.currentPriceSchema = currentPriceSchema.priceSchema;
      this.currentColorSchema = currentPriceSchema.priceSchema.colorSchema;
      console.log('currentPriceSchema', currentPriceSchema);
      console.log('this.currentColorSchema', this.currentColorSchema);
    }
  }

  setCurrentColorSchema(color, price) {
console.log('setCurrentColorSchema',color, price);


    if (!color) {
      console.log('!color',color, this.currentColorSchema.indexOf(price));
      console.log('!color currentColorSchema', this.currentColorSchema);

      this.currentColorSchema.indexOf(price);}

    console.log('!color currentColorSchema', this.currentColorSchema);
    console.log('!color currentColorSchema', this.currentColorSchema);

    console.log('color', this.currentColorSchema.indexOf(color.color));
    //this.currentColorSchema
  }

  getSectorForSetPrice($event) {
    let priceSchema = this.currentPriceSchema,
      tribuneName = $event.tribune,
      sectorNumber = $event.sector;
    this.message = '';
    this.currentTribune.name = null;

    if (!priceSchema['tribune_' + tribuneName]) {
      //this.currentTribune = this.stadium['tribune_' + tribuneName];
      this.currentSector = this.stadium['tribune_' + tribuneName]['sector_' + sectorNumber];
    } else {
      //this.currentTribune = priceSchema['tribune_' + tribuneName];

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
      sector = this.currentSector,
      tribuneColor = this.currentTribuneColor,
      sectorColor = this.currentSectorColor;

    if (!priceSchema.colorSchema) {priceSchema.colorSchema = []}

    delete sector.rows;
    let colorPriceTribune = {price : tribune.price, color: tribuneColor},
        colorPriceSector = {price : sector.price, color: sectorColor};

    priceSchema.colorSchema.push(colorPriceTribune);
    priceSchema.colorSchema.push(colorPriceSector);

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
      priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber] = sector;

      return priceSchema;
    }
  }

  savePriceSchema(form, tribuneName, sectorNumber) {
    console.log('form', form);
    console.log('this.currentColorSchema', this.currentColorSchema);
    console.log('tribuneName', tribuneName);
    console.log('sectorNumber', sectorNumber);
    console.log('$ctrl.currentTribune', this.currentTribune);
    console.log('$ctrl.currentSector', this.currentSector);
    console.log('currentTribuneColor', this.currentTribuneColor);
    console.log('currentSectorColor', this.currentSectorColor);
    form.$setDirty();
    form.schemaName.$setDirty();
    form.tribunePrice.$setDirty();
    form.sectorPrice.$setDirty();

    if (!tribuneName) {
      this.message = 'Выберите сектор.';
      return;
    }

    if (form.$valid) {
      let priceSchema = this.getPreparedPriceSchema(tribuneName, sectorNumber);
console.log('getPreparedPriceSchema priceSchema', priceSchema);
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