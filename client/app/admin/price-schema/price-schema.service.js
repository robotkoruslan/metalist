export default class PriceSchemaService {

  constructor($http) {
    'ngInject';
    this.$http = $http;

    this.colors = [
      {color: '#8b54aa', colorName: 'violet'},
      {color: '#ffcc00', colorName: 'yellow'},
      {color: '#6f89c0', colorName: 'blue'},
      {color: '#54aa6a', colorName: 'green'},
      {color: '#ff972f', colorName: 'orange'}
    ];

  }

  loadPrices() {
    return this.$http.get('/api/priceSchema');
  }

  savePriceSchema(schema) {
    return this.$http({
      method: 'PUT',
      url: '/api/priceSchema/' + schema.name,
      data: {
        schema: schema
      },
      headers: {'Accept': 'application/json'}
    });
  }

  getPriceBySector(tribuneName, sectorNumber, priceSchema) {

    if (!priceSchema['tribune_' + tribuneName]) {
      return undefined;
    }

    if (!priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber]) {
      return priceSchema['tribune_' + tribuneName].price;
    } else {
      if (!priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber].price) {
        return priceSchema['tribune_' + tribuneName].price;
      }
      return priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber].price;
    }
  }

  getColorByPrice(price) {
    return this.colors
      .filter(color => color.price == price)
      .map(color => color.color)[0];
  }

  updateColorSchema(priceSchema){
    let unicPrice = this.findUnicPrice(priceSchema);
    for (let element in priceSchema.colorSchema) {
      if (!unicPrice[priceSchema.colorSchema[element].price]) {
        priceSchema.colorSchema.splice(element, 1);
      } else {
        delete unicPrice[priceSchema.colorSchema[element].price];
      }
    }
    for (let i in unicPrice) {
      priceSchema.colorSchema.push({price : i, color : "#ffcc00"}) ;
    }
    return priceSchema;
  }

  findUnicPrice(priceSchema) {
    let obj = {};
    let tribunes = [];
    let str = /ribune/g;
    this.findObjByName(priceSchema, str, tribunes);
    for (let tribune in tribunes) {
      if (priceSchema[tribunes[tribune]].price) {
        let tribPrice = priceSchema[tribunes[tribune]].price;
        obj[tribPrice] = true;
      }
      let sectors = [];
      let str = /ector/g;
      this.findObjByName(priceSchema[tribunes[tribune]], str, sectors);
      for (let sector in sectors) {
        if (priceSchema[tribunes[tribune]][sectors[sector]].price) {
          let sectorPrice = priceSchema[tribunes[tribune]][sectors[sector]].price;
          obj[sectorPrice] = true;
        }
      }
    }
    return obj;
    }

   findObjByName(objectElements, str, fineElement) {
    for (let element in objectElements) {
      let rezultFinds = element.match(str);
      if (rezultFinds) {
        fineElement.push(element);
      }
    }
  }
}
