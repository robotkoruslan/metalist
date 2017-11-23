import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StadiumComponent } from './stadium/stadium.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [StadiumComponent ],
  exports: [ StadiumComponent ],
})
export class SharedModule { }
