import { Component, OnInit, OnChanges, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-stadium-with-tribunes',
  templateUrl: './stadium-with-tribunes.component.html',
  styleUrls: ['./stadium-with-tribunes.component.css']
})
export class StadiumWithTribunesComponent implements OnInit, OnChanges  {

  @Input() currentPrice: any;
  @Input() stadium: any;
  @Output() onClickApply = new EventEmitter<any>();


  currentPriceSchema: any = {};
  currentTribune: any = {};
  currentSector: any = {};

  constructor() { }

  ngOnInit() {
    // this.currentPriceSchema = {};
  }


  ngOnChanges(changes) {
    if (this.currentPrice) {
      // this.currentPriceSchema = angular.copy(this.currentPrice);
      this.currentPriceSchema = {...this.currentPrice};
      // this.stadium = angular.copy(this.stadium);
      this.stadium = {...this.stadium};


    }
  }

  clickApply($event) {
    this.onClickApply.emit({ currentPriceSchema: $event.currentPriceSchema});

  }

  selectTribune(tribuneName) {

    if (this.currentPriceSchema['tribune_' + tribuneName]) {
      // this.currentTribune = angular.copy(this.currentPriceSchema['tribune_' + tribuneName]);
      this.currentTribune = { ...this.currentPriceSchema['tribune_' + tribuneName]};
    } else {
      this.currentTribune.name = tribuneName;
      // this.currentTribune = angular.copy(this.currentTribune);
      this.currentTribune = { ...this.currentTribune};
    }
    this.currentSector = {};
  }

  getSectorForSetPrice($event) {
    console.log('getSectorForSetPrice ', $event);

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
