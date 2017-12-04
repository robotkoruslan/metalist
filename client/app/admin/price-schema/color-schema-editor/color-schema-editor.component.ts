import { Component, OnInit, OnChanges, Input, Output, EventEmitter  } from '@angular/core';
import { UtilService } from '../../../services/util.service';

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


  constructor(private utilService: UtilService) {
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
      const copyshema: any = [];
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
    return !this.utilService.deepEquals(this.currentColorSchema, this.sourceColorSchema);
  }

}
