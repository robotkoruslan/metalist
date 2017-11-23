import { Component, OnChanges } from '@angular/core';

@Component({
  selector: 'app-days-summary',
  templateUrl: './days-summary.component.html',
  styleUrls: ['./days-summary.component.css']
})
export class DaysSummaryComponent implements OnChanges {

  statistics: any = [];
  daysStatistics: any = [];

  constructor() { }

  ngOnChanges(changes) {
    console.log('$onChanges', this.daysStatistics);
    if (changes.daysStatistics) {
      if (!this.daysStatistics.length) {
        this.statistics = [];
      }
      if (this.daysStatistics.length) {
        this.statistics = this.daysStatistics;
      }
    }
  }

}
