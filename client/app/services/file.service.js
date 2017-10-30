export default class FileService {

  constructor($http) {
    'ngInject';
    this.$http = $http;
  }

  loadTeamLogos() {
    return this.$http.get('/api/file/teamLogos/')
      .then(response => response.data);
  }

  upload(file) {
    return this.$http({
      method: 'POST',
      url: '/api/file/upload',
      data: file,
      headers: {
        'Content-Type': undefined
      }
    });
  }
}
