export default class StadiumController {

  constructor() {

    this.colors = [
      {color: '#8b54aa', colorName: 'violet', price: '10'},
      {color: '#8b54aa', colorName: 'violet', price: '20'},
      {color: '#54aa6a', colorName: 'green', price: '30'},
      {color: '#6f89c0', colorName: 'blue', price: '35'},
      {color: '#6f89c0', colorName: 'blue', price: '40'},
      {color: '#ffcc00', colorName: 'yellow', price: '50'},
      {color: '#54aa6a', colorName: 'green', price: '100'},
      {color: '#ff972f', colorName: 'yellow', price: '150'},
      {color: '#ff972f', colorName: 'orange', price: '200'},
      {color: '#ff972f', colorName: 'orange', price: '500'},
      {color: '#54aa6a', colorName: 'green', price: '800'},
      {color: '#6f89c0', colorName: 'blue', price: '1000'}
    ];
    this.prices = [];
  }

  $onInit() {
    this.stadiumName = this.priceSchema.stadiumName;
  }

  onSectorClick($event, tribuneName, sectorNumber) {
    let price = this.getPriceBySector(tribuneName, sectorNumber, this.priceSchema);

    $event.preventDefault();

    this.onSectorSelect({
      $event: {
        price: price,
        tribune: tribuneName,
        sector: sectorNumber
      }
    });
  }

  getColor(tribuneName, sectorNumber) {
        return this.getPriceBySector(tribuneName, sectorNumber, this.priceSchema);
  }

  inPrices(price) {
    return this.prices.includes(parseInt(price));

  }

  getPriceBySector(tribuneName, sectorNumber, priceSchema) {

    if (!priceSchema['tribune_' + tribuneName]) {
      return '#808080';
    }

    if (!priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber]) {
      if (!priceSchema['tribune_' + tribuneName].color) {
        return '#808080';
      } else {
        return priceSchema['tribune_' + tribuneName].color;
      }
    } else {
      if (!priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber].color) {
        return priceSchema['tribune_' + tribuneName].color;
      }
      return priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber].color;
    }
  }
}


