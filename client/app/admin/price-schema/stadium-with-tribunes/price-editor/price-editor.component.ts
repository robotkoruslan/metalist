import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-price-editor',
  templateUrl: './price-editor.component.html',
  styleUrls: ['./price-editor.component.css']
})
export class PriceEditorComponent implements OnInit, OnChanges {

  @Input() currentPrice: any;
  @Input() currentTribune: any;
  @Input() currentSector: any;
  @Output() onClickApply = new EventEmitter<any>();

  sourcePriceSchema: any;
  currentPriceSchema: any;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes.currentTribune) {
      this.currentTribune = {...this.currentTribune};
      this.currentSector = {...this.currentSector};
      this.sourcePriceSchema = {...this.currentPrice};
      this.currentPriceSchema = {...this.sourcePriceSchema};
    }
  }


  changePrice() {
    this.currentTribune = {...this.currentTribune};
    this.currentSector = {...this.currentSector};
    this.currentPriceSchema = this.getPreparedPriceSchema(this.currentTribune.name, this.currentSector.name);

  }

  clickApply() {
    this.onClickApply.emit({
      $event: {
        currentPriceSchema: this.currentPriceSchema
      }
    });
    this.sourcePriceSchema = {...this.currentPriceSchema};
    this.currentTribune = {};
    this.currentSector = {};
  }

  isPriceChanged(){
    return this.currentPriceSchema !== this.sourcePriceSchema
  };

  getPreparedPriceSchema(tribuneName, sectorNumber) {

    let priceSchema = this.currentPriceSchema,
      tribune = this.currentTribune,
      sector = this.currentSector;

    delete sector.rows;

    if (sector.price == null && sector.name) {
      delete priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber];
      return priceSchema;
    }

    if (priceSchema['tribune_' + tribuneName] && priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber]) {
      priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber].price = sector.price;
      return priceSchema;
    }

    if (priceSchema['tribune_' + tribuneName] && !priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber] && sectorNumber) {
      priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber] = sector;
      return priceSchema;
    }

    if (!priceSchema['tribune_' + tribuneName]) {
      priceSchema['tribune_' + tribuneName] = {};
      priceSchema['tribune_' + tribuneName].name = tribune.name;
    }

    if (tribune.price) {
      priceSchema['tribune_' + tribuneName].price = tribune.price;
      return priceSchema;
    }

    if (priceSchema['tribune_' + tribuneName].price && !tribune.price) {
      delete priceSchema['tribune_' + tribuneName].price;
      return priceSchema;
    } else {
      return priceSchema;
    }
  }

}
