import { Component, OnInit } from '@angular/core';

import { PriceSchemaService } from '../../services/price-schema.service';
import { AppConstant } from '../../app.constant';

@Component({
  selector: 'app-price-schema',
  templateUrl: './price-schema.component.html',
  styleUrls: ['./price-schema.component.css']
})
export class PriceSchemaComponent implements OnInit {

  stadiumName: string = '';
  priceSchemas: any = [];
  sourcePriceSchema: any = {};
  currentPriceSchema: any = {};
  colors: any;
  stadium = AppConstant.StadiumMetalist;
  defaultPriceColor = AppConstant.DefaultPriceColor;

  constructor(private priceSchemaService: PriceSchemaService) { }

  ngOnInit() {
    this.loadPriceSchemas();
    this.colors = this.priceSchemaService.colors;
  }

  loadPriceSchemas() {
    this.priceSchemaService.loadPrices()
      .subscribe(response => {
        this.priceSchemas = response;
      });
  }

  changeSchema() {
    this.currentPriceSchema = {...this.currentPriceSchema};
  }

  edit(schema) {
    console.log(' -- edit(schema)', schema);
    if (schema) {
      this.sourcePriceSchema = {...schema};
      this.currentPriceSchema = {...this.sourcePriceSchema};
    }
  }

  savePriceSchema() {
  console.log(' -- savePriceSchema');
    this.priceSchemaService.updateColorSchema(this.currentPriceSchema);
    console.log(' --2 savePriceSchema', this.currentPriceSchema);
    this.priceSchemaService.savePriceSchema(this.currentPriceSchema)
      .subscribe(response => {
        this.edit(response.data);
        this.loadPriceSchemas();
      });

  }

  changeColor($event) {
    this.currentPriceSchema.colorSchema = $event;
    this.currentPriceSchema = {...this.currentPriceSchema};
  }


  clickApply($event) {
    this.currentPriceSchema = {...$event.currentPriceSchema};
    this.currentPriceSchema = this.priceSchemaService.updateColorSchema(this.currentPriceSchema);
  }

  isSchemaChanged() {
    return this.currentPriceSchema === this.sourcePriceSchema;
  }

}
