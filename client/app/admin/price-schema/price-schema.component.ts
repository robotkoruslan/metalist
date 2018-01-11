import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';

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

  schemaName:string = '';
  priceSchemas:PriceSchema[] = [];
  sourcePriceSchema:PriceSchema;
  currentPriceSchema:PriceSchema|null;
  colors:ColorSchema[];
  stadium = AppConstant.StadiumMetalist;
  priceSchemaForm: FormGroup;

  constructor(private priceSchemaService:PriceSchemaService, private formBuider: FormBuilder) {
    this.priceSchemaForm = formBuider.group({
      stadiumName: [{value:'', disabled: true}],
      schemaName: [null, Validators.required]
    })

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
    this.currentPriceSchema = {...schema};
  }

  setCurrentSchema(schema) {
    this.priceSchemaForm.reset();
    // source and current reference to one object
    const schemaObj = {...schema};
    this.sourcePriceSchema = schemaObj;
    this.currentPriceSchema = schemaObj;
    this.schemaName = schemaObj.name;

    this.priceSchemaForm.setValue({
      stadiumName: this.currentPriceSchema.stadiumName,
      schemaName: this.currentPriceSchema.name || ''
    });
  }

  savePriceSchema() {
    this.priceSchemaService.updateColorSchema(this.currentPriceSchema);
    this.priceSchemaService.savePriceSchema(this.currentPriceSchema)
      .subscribe((response:any) => {
        this.edit(response.data);
        this.loadPriceSchemas();
        this.currentPriceSchema = null;
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

  isPriceSchemaChanged = () => this.sourcePriceSchema !== this.currentPriceSchema ||
    this.schemaName !== this.currentPriceSchema.name;

}
