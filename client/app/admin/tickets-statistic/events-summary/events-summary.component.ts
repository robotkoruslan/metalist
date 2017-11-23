import { Component, OnChanges } from '@angular/core';

@Component({
  selector: 'app-events-summary',
  templateUrl: './events-summary.component.html',
  styleUrls: ['./events-summary.component.css']
})
export class EventsSummaryComponent implements OnChanges {

  statistics: any = [];
  eventsStatistics: any = [];

  constructor() { }

  ngOnChanges(changes) {
    if (changes.eventsStatistics) {
      this.eventsStatistics = { ...this.eventsStatistics};
      if (!this.eventsStatistics.length) {
        this.statistics = [];
      }
      if (this.eventsStatistics.length) {
        this.eventsStatistics = { ...this.eventsStatistics};
        this.statistics = { ...this.eventsStatistics};
      }
    }
  }

}
