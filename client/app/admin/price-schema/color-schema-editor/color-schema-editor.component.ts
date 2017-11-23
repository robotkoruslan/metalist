import { Component, OnInit, OnChanges, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-color-schema-editor',
  templateUrl: './color-schema-editor.component.html',
  styleUrls: ['./color-schema-editor.component.css']
})
export class ColorSchemaEditorComponent implements OnInit, OnChanges {

  // currentColorSchema: any = [];
  currentColorSchema: any;
  selectedValue: any;
@Input() sourceColorSchema: any;
@Input() colors: any;
@Output() onEdit = new EventEmitter<boolean>();


  constructor() {
  }

  ngOnInit() {
    // this.currentColorSchema = {};
    this.colors = this.copy(this.colors);

    console.log('ngOnInit ColorSchemaEditorComponent ', this.colors);
    // console.log('ngOnInit ColorSchemaEditorComponent currentColorSchema ', this.currentColorSchema);
  }

  ngOnChanges(changes) {
    if (changes.sourceColorSchema) {
      this.currentColorSchema = this.copy(this.sourceColorSchema);
    }
  }

  copy(shemas) {
    if (shemas) {
      var copyshema: any = [];
      shemas.forEach(color => {
          copyshema.push(Object.assign({}, color));
      });
      return copyshema;
    };
  }

  edit(colorSchema) {
    this.onEdit.emit(colorSchema);
  }

  isShema() {
    return this.currentColorSchema;
  }

  isColorChanged() {
    return !this.deepEquals(this.currentColorSchema, this.sourceColorSchema);
  }

  deepEquals(x, y) {
    if (x === y) {
      return true; // if both x and y are null or undefined and exactly the same
    } else if (!(x instanceof Object) || !(y instanceof Object)) {
      return false; // if they are not strictly equal, they both need to be Objects
    } else if (x.constructor !== y.constructor) {
      // they must have the exact same prototype chain, the closest we can do is
      // test their constructor.
      return false;
    } else {
      for (const p in x) {
        if (!x.hasOwnProperty(p)) {
          continue; // other properties were tested using x.constructor === y.constructor
        }
        if (!y.hasOwnProperty(p)) {
          return false; // allows to compare x[ p ] and y[ p ] when set to undefined
        }
        if (x[p] === y[p]) {
          continue; // if they have the same strict value or identity then they are equal
        }
        if (typeof (x[p]) !== 'object') {
          return false; // Numbers, Strings, Functions, Booleans must be strictly equal
        }
        if (!this.deepEquals(x[p], y[p])) {
          return false;
        }
      }
      for (const p in y) {
        if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
          return false;
        }
      }
      return true;
    }
  }

}
