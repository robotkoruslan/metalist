import template from './match-editor.html';

let matchEditorComponent = {
    templateUrl: template,
    controller: class MatchEditorController {
      constructor(MatchEditorService, PriceSchemaService, FileService) {
        'ngInject';
        this.matchEditorService = MatchEditorService;
        this.priceSchemaService = PriceSchemaService;
        this.fileService = FileService;

        this.nextMatches = [];
        this.prevMatches = [];
        this.priceSchemas = [];
        this.matchId = '';
        this.message = '';
      }

      $onInit() {
        this.loadPriceSchemas();
        this.loadMatches();
        this.getTeamLogos();
      }

      loadMatches() {
        this.loadNextMatches();
        this.loadPrevMatches();
      }

      edit(match) {
        this.matchToEdit = angular.copy(match);
      }

      remove() {
        this.deleteMatch(this.matchId);
        this.matchToEdit = undefined;
      }

      onMatchUpdate(event) {
        if (event.match.id) {
          this.saveMatch(event.match);
        } else {

          this.addMatch(event.match);
          this.message = 'Процесс создания сидений для матча запущен. Это может занять 5-10 минут. ' +
            'При успешном создании появится дата матча на домашней странице.';
        }
        this.matchToEdit = undefined;
      }

      loadPriceSchemas() {
        return this.priceSchemaService.loadPrices()
          .then(response => this.priceSchemas = response.data);
      }

      loadNextMatches() {
        this.matchId = '';
        return this.matchEditorService.loadNextMatches()
          .then(matches => this.nextMatches = matches);
      }

      loadPrevMatches() {
        this.matchId = '';
        return this.matchEditorService.loadPrevMatches()
          .then(matches => this.prevMatches = matches);
      }

      deleteMatch(matchId) {
        return this.matchEditorService.deleteMatch(matchId)
          .then(() => this.loadMatches());
      }

      addMatch(match) {
        this.matchEditorService.createMatch(match)
          .then(() => this.loadMatches());
      }

      saveMatch(match) {
        this.matchEditorService.editMatch(match)
          .then(() => this.loadMatches());
      }

      upload(file) {
        let formData = new FormData();
        formData.append("teamLogo", file.file);
        this.fileService.upload(formData)
          .then(() => this.getTeamLogos());
      }

      getTeamLogos() {
        return this.fileService.loadTeamLogos()
          .then(logo => this.allTeamLogos = logo);
      }

      isMatchExist() {
        if (this.matchToEdit) {
          return true
        }

      }
    }
  };

export default matchEditorComponent;