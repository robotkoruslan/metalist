import { Component, OnInit, OnChanges, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-menu-price-schema',
  templateUrl: './menu-price-schema.component.html',
  styleUrls: ['./menu-price-schema.component.css']
})
export class MenuPriceSchemaComponent implements OnInit, OnChanges {

  @Input() priceSchemas: any;
  @Output() onEdit = new EventEmitter<boolean>();


  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes.priceSchemas) {
      // this.priceSchemas = angular.copy(this.priceSchemas);
    }
  }

  edit(priceSchemas:any) {

    var priceSchema = priceSchemas.priceSchema;
    if (!priceSchemas.priceSchema.id) {
      priceSchema.id = priceSchemas.id;
    }
    console.log('edit ', priceSchema);
    this.onEdit.emit(priceSchema);
  }
  // edit(priceSchemas) {
  //
  //   console.log('edit ', priceSchemas);
  //   //@TODO remove id assigning after priceSchema refactoring
  //   this.priceSchema = priceSchemas.priceSchema;
  //   if (!priceSchemas.priceSchema.id) {
  //     this.priceSchema.id = priceSchemas.id;
  //   }
  //   this.onEdit({
  //     $event: {
  //       priceSchema: priceSchema
  //     }
  //   });
  // }

}
