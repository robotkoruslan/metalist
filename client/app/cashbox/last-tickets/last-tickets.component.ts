import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { PrintTicketService } from '../../services/print-ticket.service';
import { TicketService } from '../../services/ticket.service';
// import * as moment from "moment";
// import _date = moment.unitOfTime._date;

@Component({
  selector: 'app-last-tickets',
  templateUrl: './last-tickets.component.html',
  styleUrls: ['./last-tickets.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LastTicketsComponent implements OnInit {

  // public localState = { value: '' };

  statistics: any = [];
  lastTickets: any = [];
  ticket: any = [];
  currentData: Date = new Date();

    constructor( private ticketsService: TicketService) {
    // constructor(private printTicketService: PrintTicketService, private ticketsService: TicketService) {
    // this.ticket = [];
    // this.statistics = [];
    // this.lastTickets =[];
    // this.currentData = new Date();
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.getStatistics({
      date: this.currentData,
      metod: 'event'
    });
  }

  dateChanges(){
    // this.currentData = $event.date;
    this.getStatistics({
      date: this.currentData,
      metod: 'event'
    });
  };

  getStatistics(date) {
    console.log('LastTicketsComponent getStatistics');
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
