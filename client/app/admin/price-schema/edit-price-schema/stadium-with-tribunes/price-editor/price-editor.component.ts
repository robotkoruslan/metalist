import {Component, OnChanges, Input, Output, EventEmitter} from '@angular/core';

import {Tribune} from '../../../../../model/tribune.interface';
import {Sector} from '../../../../../model/sector.interface';
import {PriceSchema} from '../../../../../model/price-schema.interface';
import {PriceSchemaService} from "../../../../../services/price-schema.service";

@Component({
  selector: 'app-price-editor',
  templateUrl: './price-editor.component.html',
  styleUrls: ['./price-editor.component.css']
})

export class PriceEditorComponent implements OnChanges {

  @Input() currentPrice: PriceSchema;
  @Input() currentTribune: Tribune;
  @Input() currentSector: Sector;
  @Output() onClickApply = new EventEmitter<any>();

  sourceTribune: Tribune;
  sourceSector: Sector;
  currentPriceSchema: PriceSchema;

  constructor(private priceSchemaService: PriceSchemaService) {
  }

  ngOnChanges(changes) {
    if (changes.currentTribune || changes.currentSector) {
      this.sourceTribune = {...this.currentTribune};
      this.sourceSector = {...this.currentSector};
      this.currentPriceSchema = {...this.currentPrice};
    }
  }

  changePrice() {
    const tribune = this.currentTribune ? this.currentTribune.name : null;
    const sector = this.currentSector ? this.currentSector.name : null;
    this.currentPriceSchema = this.getPreparedPriceSchema(tribune, sector);
  }

  clickApply() {
    this.changePrice();
    this.currentPriceSchema = this.priceSchemaService.updateColorSchema(this.currentPriceSchema);
    this.onClickApply.emit(this.currentPriceSchema);
    this.currentTribune = null;
    this.currentSector = null;
  }

  isPriceChanged() {
    const currentTribunePrice = this.currentTribune && this.currentTribune.price || null;
    const sourceTribunePrice = this.sourceTribune.price || null;
    const currentSectorPrice = this.currentSector && this.currentSector.price || null;
    const sourceSectorPrice = this.sourceSector.price || null;
    return sourceSectorPrice !== currentSectorPrice || sourceTribunePrice !== currentTribunePrice;
  };

  getPreparedPriceSchema(tribuneName, sectorNumber) {
    let priceSchema = this.currentPrice,
      tribune = this.currentTribune,
      sector = this.currentSector;

    if (!priceSchema['tribune_' + tribuneName]) {
      priceSchema['tribune_' + tribuneName] = {name: tribuneName}
    }

    if (tribune.price) {
      priceSchema['tribune_' + tribuneName].price = tribune.price;
    } else {
      delete priceSchema['tribune_' + tribuneName].price;
    }

    if (sectorNumber) {
      delete sector.rows;
      priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber] = sector;
      if (!sector.price) {
        delete priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber];
      }
    }
    return priceSchema;

  }

}
