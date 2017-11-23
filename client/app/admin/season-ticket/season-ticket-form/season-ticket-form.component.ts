import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-season-ticket-form',
  templateUrl: './season-ticket-form.component.html',
  styleUrls: ['./season-ticket-form.component.css']
})
export class SeasonTicketFormComponent implements OnInit, OnChanges {

  newTicket: any = {};
  date: Date = new Date();
  // this.date.setMonth(this.date.getMonth() + 4);
  errorMessageBlockRow: string = '';
  errorMessage: string = '';

  constructor() { }

  ngOnInit() {
    this.onInit();
  }

  ngOnChanges(changes) {
    if ( changes.errorMessage ) {
      this.errorMessageBlockRow = this.errorMessage;
    }

  }

  onInit() {
    this.newTicket = {};
    this.newTicket.reservedUntil = this.date;
    this.errorMessageBlockRow = '';
  }

  // update() {
  //   this.onChange({
  //     $event: {
  //       ticket: this.newTicket
  //     }
  //   });
  //   this.onInit();
  // }

}
