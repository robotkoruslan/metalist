import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-block-row-form',
  templateUrl: './block-row-form.component.html',
  styleUrls: ['./block-row-form.component.css']
})
export class BlockRowFormComponent implements OnInit {

  blockRow: any = {};
  date: Date = new Date();
  // date.setMonth(this.date.getMonth() + 6);
  errorMessageSeat: string = '';
  errorMessage: string = '';

  constructor() { }

  ngOnInit() {
    this.initComponent();
  }

  initComponent() {
    this.blockRow = {};
    this.blockRow.reservedUntil = this.date;
    this.errorMessageSeat = '';
  }

  $onChanges(changes) {
    if ( changes.errorMessage ) {
      this.errorMessageSeat = this.errorMessage;
    }
  }

  // add() {
  //   this.onAdd({
  //     $event: {
  //       blockRow: this.blockRow
  //     }
  //   });
  //   this.initComponent();
  // }

}
