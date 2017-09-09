import template from './color-schema-editor.html';

let colorSchemaEditorComponent = {
  bindings: {
    currentColorSchema: '<',
    colors: '<',
    onEdit: '&'
  },
  templateUrl: template,
  controller: class ColorSchemaEditorController {
    constructor() {
      'ngInject';
    }

  $onChanges(changes) {
    if ( changes.currentColorSchema ) {
      this.tempColorSchema = angular.copy(this.currentColorSchema);
      this.editColorSchema = angular.copy(this.tempColorSchema);
    }
  }

  $onInit() {
    this.editColorSchema = [];
    this.tempColorSchema = [];
    this.applyColor = false;
    this.colors = Object.assign({}, this.colors);
  }

  edit(colorSchema) {
    this.onEdit({
      $event: {
        colorSchema: colorSchema
      }
    });
    this.applyColor = false;
  }

  colorChanges() {
    if(!angular.equals(this.tempColorSchema, this.currentColorSchema)) {
      this.tempColorSchema = angular.copy(this.currentColorSchema);
    }

    if (this.currentColorSchema) {
      if(!angular.equals(this.currentColorSchema, this.editColorSchema)) {
        return this.applyColor = true;
      } else {
        return this.applyColor = false;
      }
    }
  }

  }
};

export default colorSchemaEditorComponent;