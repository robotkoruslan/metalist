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
      url: '/api/priceSchema/' + schema.id,
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
        if (!priceSchema.colorSchema) {
          priceSchema.colorSchema = []
        }
    let uniquePrices = this.getUniquePrices(priceSchema);
    let uniqueColors = priceSchema.colorSchema
      .filter(color => uniquePrices.includes(parseInt(color.price)));
    priceSchema.colorSchema = uniquePrices.map(price => {
      let color = uniqueColors.filter(color => color.price == price)[0];
      return color || {price : price, color : "#ffcc00"};
    });
    return priceSchema;
  }

  getUniquePrices(priceSchema) {
    let arr = [];
    let tribunes = [];
    let str = /ribune/g;
    this.findObjByName(priceSchema, str, tribunes);
    for (let tribune in tribunes) {
      if (priceSchema[tribunes[tribune]].price) {
        let tribPrice = priceSchema[tribunes[tribune]].price;
        arr.push(tribPrice);
      }
      let sectors = [];
      let str = /ector/g;
      this.findObjByName(priceSchema[tribunes[tribune]], str, sectors);
      for (let sector in sectors) {
        if (priceSchema[tribunes[tribune]][sectors[sector]].price) {
          let sectorPrice = priceSchema[tribunes[tribune]][sectors[sector]].price;
          arr.push(sectorPrice);
        }
      }
    }
    return [...new Set(arr)];
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
