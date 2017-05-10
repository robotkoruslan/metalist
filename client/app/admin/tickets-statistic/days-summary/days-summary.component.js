import template from './days-summary.html';

class DaysSummaryController {

  constructor() {
    this.statistics = [];
  }

  $onInit() {

  }

  $onChanges(changes) {
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

let daysSummaryComponent = {
  templateUrl: template,
  controller: DaysSummaryController,
  bindings: {
    daysStatistics: '<'
  }
};

export default daysSummaryComponent;