import moment from 'moment-timezone';

export default class HomeController {

  constructor($http, MatchEditorService) {
    'ngInject';
    this.$http = $http;
    this.matchEditorService = MatchEditorService;
    this.matches = [];

    this.loadMatches();
  }

  loadMatches() {
    return this.matchEditorService.loadMatches()
      .then(mathces => {
        this.matches = mathces;
        this.matches.forEach(match => {
          if (match.date) {
            match.formattedDate = moment(match.date).locale('ru').tz('Europe/Kiev').format('DD MMMM YYYY');
            match.time = moment(match.date).tz('Europe/Kiev').format('HH:mm');
          }
        });
      });
  }

}