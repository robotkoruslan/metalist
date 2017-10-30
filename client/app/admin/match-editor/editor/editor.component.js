import template from './editor.html';

let editorComponent = {
  templateUrl: template,
  bindings: {
    matchToEdit: '<',
    priceSchemas: '<',
    allTeamLogos: '<',
    onChange: '&',
    onUpload: '&'
  },
  controller: class EditorController {

    constructor() {
      this.date = new Date();
      this.date.setDate(this.date.getDate() + 1);
      this.currentFileName = '';

    }

    $onChanges(changes) {
      this.match = angular.copy(this.matchToEdit);
      this.priceSchemas = angular.copy(this.priceSchemas);
      this.allTeamLogos = angular.copy(this.allTeamLogos);

      if (!this.matchToEdit.id) {
        this.match.date = this.date;
        this.match.priceSchema = this.priceSchemas[0];
      }

      if (changes.allTeamLogos && this.currentFileName) {
          this.match.poster = 'assets/teamLogos/' + this.currentFileName;
        }
    }

    update() {
      this.onChange({
        $event: {
          match: this.match
        }
      });
    }

    upload() {
      let file = document.getElementById('file').files[0];
      this.currentFileName = file.name;
      if (file) {
        this.onUpload({
          $event: {
            file: file
          }
        });
      }

    }
  }
};

export default editorComponent;