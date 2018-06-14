import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Seat} from '../../../model/seat.interface';

@Component({
  selector: 'block-row-seat-table',
  template: `
    <table class="table">
      <thead [class.seat-exists]="isSeatExist">
      <tr>
        <th>Сектор</th>
        <th>Ряд</th>
        <th *ngIf="isSeatExist">{{'common.place' | translate}}</th>
        <th>{{'placeholder.reservedUntil' | translate}}</th>
        <th class="action">{{'admin.delete' | translate}}</th>
        <th class="action" *ngIf="type === 'seat'" >{{'admin.extend' | translate}}</th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let element of data">
        <td>{{element.sector}}</td>
        <td>{{element.row}}</td>
        <td *ngIf="isSeatExist">{{element.seat}}</td>
        <td>{{element.reservedUntil | localeDate:'dddd, MMMM DD, YYYY'}}</td>
        <td class="action" (click)="onDelete(element)"><i class="fa fa-trash" aria-hidden="true"></i></td>
        <td class="action" *ngIf="type === 'seat'" (click)="onExtend(element._id)"><i class="fa fa-angle-double-up" aria-hidden="true"></i></td>
      </tr>
      <tbody>
    </table>
  `,
  styleUrls: ['./block-row-seat-table.scss']
})

export class BlockRowSeatTableComponent {
  @Input() data: Seat[];
  @Input() isSeatExist: boolean;
  @Input() type: string;
  @Output() delete = new EventEmitter();
  @Output() extend = new EventEmitter<string>();

  public onDelete(element): void {
    this.delete.emit(element);
  };

  public onExtend(ticketId): void {
    this.extend.emit(ticketId);
  }
}
