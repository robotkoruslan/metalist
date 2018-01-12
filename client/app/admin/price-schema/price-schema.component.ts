import {Component, OnInit} from '@angular/core';

import {PriceSchemaService} from '../../services/price-schema.service';

import {PriceSchema} from '../../model/price-schema.interface';
import {ColorSchema} from "../../model/color-schema.interface";

@Component({
  selector: 'app-price-schema',
  templateUrl: './price-schema.component.html',
  styleUrls: ['./price-schema.component.css']
})
export class PriceSchemaComponent implements OnInit {

  priceSchemas:PriceSchema[] = [];
  sourcePriceSchema:PriceSchema;
  currentPriceSchema:PriceSchema|null;
  colors:ColorSchema[];

  constructor(private priceSchemaService:PriceSchemaService) {
  }

  ngOnInit() {
    this.loadPriceSchemas();
    this.colors = this.priceSchemaService.colors;
  }

  loadPriceSchemas() {
    this.priceSchemaService.loadPrices()
      .subscribe(
        response => {
          this.priceSchemas = response;
        },
        err => console.log(err)
      );
  }

  setCurrentSchema(schema) {
    this.sourcePriceSchema = {...schema};
    this.currentPriceSchema = {...this.sourcePriceSchema};
  }

  updateSchema(schema) {
    this.priceSchemaService.savePriceSchema(schema)
      .subscribe(
        (response:any) => {
          this.currentPriceSchema = {...response.data};
          this.loadPriceSchemas();
          this.currentPriceSchema = null;
        },
        err => console.log(err)
      );
  }

}
