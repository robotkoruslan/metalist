import {Component, OnInit} from '@angular/core';

import {PriceSchemaService} from '../../services/price-schema.service';
import {AppConstant} from '../../app.constant';

import {PriceSchema} from '../../model/price-schema.interface';
import {ColorSchema} from "../../model/color-schema.interface";

@Component({
  selector: 'app-price-schema',
  templateUrl: './price-schema.component.html',
  styleUrls: ['./price-schema.component.css']
})
export class PriceSchemaComponent implements OnInit {

  stadiumName:string = '';
  priceSchemas:PriceSchema[] = [];
  sourcePriceSchema:any = {};
  currentPriceSchema:any = {};
  colors:ColorSchema[];
  stadium = AppConstant.StadiumMetalist;
  defaultPriceColor = AppConstant.DefaultPriceColor;

  constructor(private priceSchemaService:PriceSchemaService) {
  }

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
      .subscribe((response:any) => {
        this.edit(response.data);
        this.loadPriceSchemas();
      });

  }

  changeColor($event) {
    this.currentPriceSchema.colorSchema = $event;
    this.currentPriceSchema = {...this.currentPriceSchema};
  }


  clickApply(priceSchema) {
    this.currentPriceSchema = {...priceSchema};
    this.currentPriceSchema = this.priceSchemaService.updateColorSchema(this.currentPriceSchema);
  }

}
