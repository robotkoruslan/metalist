import template from './editor.html';
import EditorController from './editor.controller';

let editorComponent = {
  templateUrl: template,
  controller: EditorController,
  bindings: {
    matchToEdit: '<',
    priceSchemas: '<',
    onChange: '&'
  }
};

export default editorComponent;