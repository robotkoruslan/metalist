import {Component, OnChanges, Input, Output, EventEmitter} from '@angular/core';

import {PriceSchema} from '../../../model/price-schema.interface';
import {Tribune} from '../../../model/tribune.interface';
import {Sector} from '../../../model/sector.interface';

@Component({
  selector: 'app-stadium-with-tribunes',
  templateUrl: './stadium-with-tribunes.component.html',
  styleUrls: ['./stadium-with-tribunes.component.css']
})
export class StadiumWithTribunesComponent implements OnChanges {

  @Input() currentPrice:PriceSchema;
  @Input() stadium:any;
  @Output() onClickApply = new EventEmitter<any>();


  currentPriceSchema:PriceSchema;
  currentTribune:Tribune;
  currentSector:Sector|{};

  constructor() {
  }
  
  ngOnChanges(changes) {
    if (this.currentPrice) {
      this.currentPriceSchema = {...this.currentPrice};
      this.stadium = {...this.stadium};
    }
  }

  clickApply(priceSchema) {
    this.onClickApply.emit(priceSchema);
  }

  selectTribune(tribuneName) {
    if (this.currentPriceSchema['tribune_' + tribuneName]) {
      this.currentTribune = { ...this.currentPriceSchema['tribune_' + tribuneName]};
    } else {
      this.currentTribune.name = tribuneName;
      this.currentTribune = { ...this.currentTribune};
    }
    this.currentSector = {};
  }

  getSectorForSetPrice($event) {
  
    let priceSchema = this.currentPriceSchema,
      tribuneName = $event.tribune,
      sectorNumber = $event.sector;
  
    if (!priceSchema['tribune_' + tribuneName]) {
      this.currentTribune = Object.assign({}, this.stadium['tribune_' + tribuneName]);
      this.currentSector = Object.assign({}, this.stadium['tribune_' + tribuneName]['sector_' + sectorNumber]);
    } else {
      this.currentTribune = priceSchema['tribune_' + tribuneName];
  
      if (!priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber]) {
        this.currentSector = Object.assign({}, this.stadium['tribune_' + tribuneName]['sector_' + sectorNumber]);
      } else {
        this.currentSector = priceSchema['tribune_' + tribuneName]['sector_' + sectorNumber];
      }
    }
  }
  
  isStadium(stadiumName) {
    if (this.hasOwnProperty('currentPriceSchema')) {
      if (this.currentPriceSchema.hasOwnProperty('stadiumName')) {
        if (this.currentPriceSchema.stadiumName === stadiumName) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
}
