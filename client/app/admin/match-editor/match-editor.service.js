export default class MatchEditorService {

  constructor($http) {
    'ngInject';
    this.$http = $http;

  }

  loadNextMatches() {
    return this.$http.get('/api/matches/next/')
      .then(response => response.data);
  }

  loadPrevMatches() {
    return this.$http.get('/api/matches/prev/')
      .then(response => response.data);
  }

  createMatch(match) {
    return this.$http({
      method: 'POST',
      url: '/api/matches',
      data: match,
      headers: {'Accept': 'application/json'}
    });
  }

  editMatch(match) {
    return this.$http({
      method: 'PUT',
      url: '/api/matches/' + match._id,
      data: match,
      headers: {'Accept': 'application/json'}
    });
  }

  deleteMatch(matchId) {
    return this.$http({
      method: 'delete',
      url: '/api/matches/' + matchId,
      headers: {'Accept': 'application/json'}
    });
  }

}