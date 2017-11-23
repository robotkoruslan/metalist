import { Component, OnChanges } from '@angular/core';

@Component({
  selector: 'app-block-row-list',
  templateUrl: './block-row-list.component.html',
  styleUrls: ['./block-row-list.component.css']
})
export class BlockRowListComponent implements OnChanges {

  blockRows: any = [];
  blockRowSeats: any = [];

  constructor() { }

  ngOnChanges(changes) {
    if ( changes.blockRowSeats ) {
      this.blockRows = this.createBlockRowsModel(this.blockRowSeats);
    }
  }

  // deleteBlockRow(row) {
  //   this.onDelete({$event: { blockRow: row}});
  // }

  createBlockRowsModel(seats) {
    let rows = [];

    seats.forEach(seat => {
      if( this.checkSeatInRows(rows, seat) ) {
        let row = {
          sector: seat.sector,
          row: seat.row,
          reservedUntil: seat.reservedUntil
        };
        rows.push(row);
      }
    });

    return rows;
  }

  checkSeatInRows(rows, seat) {
    return !rows.filter(row => (row.sector === seat.sector && row.row === seat.row)).length;
  }

}
