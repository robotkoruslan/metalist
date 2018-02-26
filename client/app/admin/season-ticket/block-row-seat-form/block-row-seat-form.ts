import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'block-row-seat-form',
  template: `
    <form class="form" novalidate #form="ngForm" [class.seat-exists]="isSeatExist">
      <mat-form-field>
        <input matInput name="sector" ngModel placeholder="Сектор" required/>
      </mat-form-field>
      <mat-form-field>
        <input matInput name="row" ngModel placeholder="Ряд" required/>
      </mat-form-field>
      <mat-form-field *ngIf="isSeatExist">
        <input matInput name="seat" ngModel [placeholder]="'common.place' | translate" required/>
      </mat-form-field>
      <mat-form-field>
        <input matInput [matDatepicker]="picker" ngModel name="reservedUntil"
               [placeholder]="'placeholder.reservedUntil' | translate" required>
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
      <div class="button-container">
        <button type="submit" class="btn btn-default" (click)="onAdd(form.value); form.reset()"
                [disabled]="form.invalid">{{'admin.add' | translate}}
        </button>
      </div>
    </form>
    <blockquote *ngIf="message">
      <p>{{message}}</p>
    </blockquote>
  `,
  styleUrls: ['./block-row-seat-form.css']
})

export class BlockRowSeatFormComponent {
  @Input() isSeatExist: boolean;
  @Input() message: string;
  @Output() add = new EventEmitter();

  onAdd = (value) => this.add.emit(value);


}
