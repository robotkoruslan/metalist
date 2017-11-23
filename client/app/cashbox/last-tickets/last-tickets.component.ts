import { Component, OnInit } from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

import { PrintTicketService } from '../../services/print-ticket.service';
import { TicketService } from '../../services/ticket.service';
// import * as moment from "moment";
// import _date = moment.unitOfTime._date;



@Component({
  selector: 'app-last-tickets',
  templateUrl: './last-tickets.component.html',
  styleUrls: ['./last-tickets.component.css']
})
export class LastTicketsComponent implements OnInit {

  statistics: any = [];
  lastTickets: any = [];
  ticket: any = [];
  currentData: Date = new Date();

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.getStatistics({
      date: event.value.toISOString(),
      metod: 'event'
    });
  }

    constructor( private ticketsService: TicketService) {
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.getStatistics({
      date: this.currentData.toISOString(),
      metod: 'event'
    });
  }

  getStatistics(date) {
    this.ticketsService.getStatistics(date).subscribe(statistic => {
      this.statistics = statistic;
    });
  }
  // getStatistics(date) {
  //   console.log('LastTicketsComponent getStatistics');
  //   this.statistics = this.ticketsService.getStatistics(date);
  //   console.log('LastTicketsComponent this.statistics', this.statistics);
  // }

  // prints(stat) {
  //   let blank = angular.copy(stat);
  //   this.ticket = [];
  //   let seat = {};
  //   seat.tribune = blank.tribune;
  //   seat.sector = blank.sector;
  //   seat.row = blank.row;
  //   seat.seat = blank.seat;
  //   blank.seat = seat;
  //   this.ticket.push(blank);
  // }

  // removeTicket(ticketId) {
  //   return this.ticketsService.removeTicket(ticketId)
  //     .then(() => this.getStatistics({date: this.currentData, metod: 'event'}))
  // }

  // ticketRendering(){
  //   this.printTicketService.print();
  // }



}
