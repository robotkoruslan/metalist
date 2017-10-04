import template from './color-schema-editor.html';

let colorSchemaEditorComponent = {
  bindings: {
    sourceColorSchema: '<',
    colors: '<',
    onEdit: '&'
  },
  templateUrl: template,
  controller: class ColorSchemaEditorController {
    constructor() {
      'ngInject';
    }

  $onChanges(changes) {
    if ( changes.sourceColorSchema ) {
      this.currentColorSchema = angular.copy(this.sourceColorSchema);
    }
  }

  $onInit() {
    this.sourceColorSchema = [];
    this.currentColorSchema = [];
    this.colors = Object.assign({}, this.colors);
  }

  edit(colorSchema) {
    this.onEdit({
      $event: {
        colorSchema: colorSchema
      }
    });
  }

  isColorChanged() {
    return !angular.equals(this.currentColorSchema, this.sourceColorSchema)
  }

  }
};

export default colorSchemaEditorComponent;