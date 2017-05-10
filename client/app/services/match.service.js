export default class MatchService {

  constructor($http) {
    'ngInject';
    this.$http = $http;
  }

  fetchMatch(id) {
    return this.$http.get('/api/matches/' + id)
      .then(response => response.data)
      ;
  }

  fetchMatchSeats(id) {
    return this.$http.get('/api/matches/' + id + '/seats')
      .then(response => response.data)
      ;
  }
}
