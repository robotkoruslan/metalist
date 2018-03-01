import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
  MatFormFieldModule
} from '@angular/material';
import { StadiumComponent } from './stadium/stadium.component';
import { InputRequiredErrorComponent } from './form-fields/input-required-error.component';
import {TranslateModule} from '@ngx-translate/core';
import {InputInvalidEmailErrorComponent} from './form-fields/input-invalid-email-error.component';
import {LocaleDatePipe} from '../pipes/locale-date.pipe';
import {LogoCircleComponent} from './logo-circle/logo-circle.components';
import {IfScrollbarsModule} from 'ng2-if-scrollbars';
@NgModule({
  imports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    IfScrollbarsModule
  ],
  declarations: [
    StadiumComponent,
    InputRequiredErrorComponent,
    InputInvalidEmailErrorComponent,
    LogoCircleComponent,
    LocaleDatePipe
  ],
  exports: [
    StadiumComponent,
    InputRequiredErrorComponent,
    InputInvalidEmailErrorComponent,
    LogoCircleComponent,
    LocaleDatePipe,
  IfScrollbarsModule
  ],
})
export class SharedModule { }
