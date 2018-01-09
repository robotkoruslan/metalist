import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PriceSchemaService {

  colors: any = [
    {color: '#8b54aa', colorName: 'violet'},
    {color: '#ffcc00', colorName: 'yellow'},
    {color: '#6f89c0', colorName: 'blue'},
    {color: '#54aa6a', colorName: 'green'},
    {color: '#ff972f', colorName: 'orange'},
    {color: '#ff69b4', colorName: 'pink'},
    {color: '#add8e6', colorName: 'light-blue'},
    {color: '#90EE90', colorName: 'light-green'},
    {color: '#ffb6c1', colorName: 'light-pink'},
    {color: '#8b4513', colorName: 'brown'},

  ];

  constructor(private http: HttpClient) { }

  loadPrices(): Observable<any> {
    return this.http.get('/api/priceSchema');
  }

  savePriceSchema(schema): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = {headers: headers};
    const body = schema;
    return this.http.put('/api/priceSchema/' + schema.id, body, options)
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
      .filter(color => color.price === price)
      .map(color => color.color)[0];
  }

  updateColorSchema(priceSchema){
    if (!priceSchema.colorSchema) {
      priceSchema.colorSchema = []
    }
    const uniquePrices = this.getUniquePrices(priceSchema);
    const uniqueColors = priceSchema.colorSchema
      .filter(color => uniquePrices.includes(parseInt(color.price)));
    priceSchema.colorSchema = uniquePrices.map(price => {
      const color = uniqueColors.filter(color => color.price === price)[0];
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
    return this.unique(arr);
  }

  unique(arr) {
    var result = [];
    nextInput:
      for (var i = 0; i < arr.length; i++) {
        var str = arr[i]; // для каждого элемента
        for (var j = 0; j < result.length; j++) { // ищем, был ли он уже?
          if (result[j] == str) continue nextInput; // если да, то следующий
        }
        result.push(str);
      }
    return result;
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
