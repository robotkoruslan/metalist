import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import {UtilService} from "../../services/util.service";


@Component({
  selector: 'app-stadium',
  templateUrl: './stadium.component.html',
  styleUrls: ['./stadium.component.css']
})
export class StadiumComponent implements OnChanges {

  @Input() priceSchema: any;
  @Output() onSectorSelect = new EventEmitter<any>();


  prices: any = [];
  stadiumName: any = {};
  defaultPriceColor: any = {color : '#808080' };

  constructor(private utilService: UtilService) { }
  
  ngOnChanges(changes) {
    if ( changes.priceSchema ) {
      if (this.priceSchema !== undefined) {
        if (this.priceSchema.hasOwnProperty('stadiumName')) {
          this.stadiumName = this.priceSchema.stadiumName;
        }
      }
    }
  }

  isStadium(stadiumName) {
    if (this.hasOwnProperty('priceSchema')) {
      if (this.priceSchema !== undefined) {
        if (this.priceSchema.hasOwnProperty('stadiumName')) {
          return !this.utilService.deepEquals(this.priceSchema.stadiumName, stadiumName);
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  onSectorClick($event, tribuneName, sectorNumber) {
    console.log('onSectorClick', tribuneName, sectorNumber);
    const price = this.getPriceBySector(tribuneName, sectorNumber, this.priceSchema);
    const increased = {
      price: price,
      tribune: tribuneName,
      sector: sectorNumber
    };
    this.onSectorSelect.emit(increased);

  }

  getColor(tribuneName, sectorNumber) {
    let price = this.getPriceBySector(tribuneName, sectorNumber, this.priceSchema);

    if (!price) {
      return this.defaultPriceColor.color;
    }
    else {
      return this.getColorByPrice(price);
    }
  }

  getColorByPrice(price) {
    return this.priceSchema.colorSchema && this.priceSchema.colorSchema
      .filter(color => color.price === price)
      .map(color => color.color)[0];
  }

  getPriceBySector(tribuneName, sectorNumber, priceSchema) {
    const currentTribune = priceSchema['tribune_' + tribuneName];
    if (!currentTribune) {
      return undefined;
    }
    if (currentTribune) {
      const currentSector = currentTribune['sector_' + sectorNumber];
      if (!currentSector) {
        if (!currentTribune.price) {
          return undefined;
        } else {
          return currentTribune.price;
        }
      } else {
        if (!currentSector.price) {
          return currentTribune.price;
        }
        return currentSector.price;
      }
    }

  }

}
