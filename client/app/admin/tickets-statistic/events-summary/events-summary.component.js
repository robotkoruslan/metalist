import template from './events-summary.html';

class EventsSummaryController {

  constructor() {
    this.statistics = [];
  }

  $onInit() {
  }

  $onChanges(changes) {
    if (changes.eventsStatistics) {
      if (!this.eventsStatistics.length) {
        this.statistics = [];
      }
      if (this.eventsStatistics.length) {
        this.statistics = this.eventsStatistics;
      }
    }
  }
}

let eventsSummaryComponent = {
  templateUrl: template,
  controller: EventsSummaryController,
  bindings: {
    eventsStatistics: '<'
  }
};

export default eventsSummaryComponent;