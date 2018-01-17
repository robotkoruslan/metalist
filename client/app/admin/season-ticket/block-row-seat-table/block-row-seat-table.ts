import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Seat} from '../../../model/seat.interface';

@Component({
  selector: 'block-row-seat-table',
  template: `
    <table class="table">
      <thead [class.seat-exists]="isSeatExist">
      <tr>
        <th>Sector</th>
        <th>Row</th>
        <th *ngIf="isSeatExist">Seat</th>
        <th>Reserved until</th>
        <th>Delete</th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let element of data">
        <td>{{element.sector}}</td>
        <td>{{element.row}}</td>
        <td *ngIf="isSeatExist">{{element.seat}}</td>
        <td>{{element.reservedUntil | date:'fullDate'}}</td>
        <td (click)="onDelete(element)"><i class="fa fa-trash" aria-hidden="true"></i></td>
      </tr>
      <tbody>
    </table>
  `,
  styleUrls: ['./block-row-seat-table.css']
})

export class BlockRowSeatTableComponent {
  @Input() data: Seat[];
  @Input() isSeatExist: boolean;
  @Output() delete = new EventEmitter();
  onDelete = (element) => this.delete.emit(element);
}
