import template from './match-details.html';
import moment from 'moment-timezone';

class MatchDetailsController {

  constructor() {
    'ngInject';
    this.matchDetails = {};
  }

  $onInit() {

  }

  $onChanges(changes) {
    if (changes.match) {
      if (!this.match.id) {
        this.matchDetails = {};
      }
      if (this.match.id) {
        this.matchDetails = this.match;
        this.matchDetails.formattedDate = moment(this.matchDetails.date).locale('ru').tz('Europe/Kiev').format('DD MMMM YYYY');
        this.matchDetails.time = moment(this.matchDetails.date).tz('Europe/Kiev').format('HH:mm');
      }
    }
  }
}

let matchDetailsComponent = {
  templateUrl: template,
  controller: MatchDetailsController,
  bindings: {
    match: '<'
  }
};

export default matchDetailsComponent;