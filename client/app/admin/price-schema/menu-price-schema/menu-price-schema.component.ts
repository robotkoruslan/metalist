import {Component, OnInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';

import {PriceSchema} from '../../../model/price-schema.interface';

@Component({
  selector: 'app-menu-price-schema',
  templateUrl: './menu-price-schema.component.html',
  styleUrls: ['./menu-price-schema.component.css']
})
export class MenuPriceSchemaComponent {

  @Input() priceSchemas: { priceSchema: PriceSchema }[];
  @Output() onSetSchema = new EventEmitter<boolean>();

  constructor() {
  }

  selectSchema = (schema) => this.onSetSchema.emit(schema);

}
