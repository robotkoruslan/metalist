import { Component, OnInit } from '@angular/core';
import { SeasonTicketService } from '../../services/season-ticket.service';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-season-ticket',
  templateUrl: './season-ticket.component.html',
  styleUrls: ['./season-ticket.component.css'],
  providers: [ TicketService, SeasonTicketService ]
})
export class SeasonTicketComponent implements OnInit {

  errorMessageSeat: string;
  errorMessageBlockRow: string;
  lastTickets: any = [];
  ticket: any = [];

  constructor(private ticketsService: TicketService, private seasonTicketService: SeasonTicketService) { }

  ngOnInit() {
  }

  $onInit() {
    this.loadSeasonTickets();
    this.loadBlockRowSeats();
  }

  loadSeasonTickets() {
    this.seasonTicketService.loadSeasonTickets();
      // .then(response => this.seasonTickets = response.data);
    this.errorMessageSeat = '';
  }

  // loadPreSaleAbonementTickets() {
  //   this.ticketsService.fetchReservedSeats();
  //     // .then(response => this.preSaleAbonementTickets = response.data);
  //   this.errorMessageSeat = '';
  // }

  loadBlockRowSeats() {
    this.seasonTicketService.loadBlockRowSeats();
      // .then(response => this.blockRowSeats = response.data);
    this.errorMessageBlockRow = '';
  }

  createSeasonTicket($event) {
    const slug = 's' + $event.ticket.sector + 'r' + $event.ticket.row + 'st' + $event.ticket.seat;

    this.seasonTicketService.createSeasonTicket($event.ticket, slug);
      // .then(() => {
      //   this.loadSeasonTickets();
      // })
      // .catch((err) => {
      //   if (err.status === 409) {
      //     this.errorMessageSeat = 'Это место уже занято.';
      //   }
      // });
  }

  deleteSeasonTicket($event) {
    this.seasonTicketService.deleteSeasonTicket($event.slug);
      // .then(() => {
      //   this.loadSeasonTickets();
      // });
  }

  addBlockRow($event) {
    this.seasonTicketService.addBlockRow($event.blockRow);
      // .then(() => this.loadBlockRowSeats())
      // .catch((err) => {
      //   if (err.status === 409) {
      //     this.errorMessageBlockRow = 'Этот ряд уже заблокирован.';
      //   }
      // });
  }

  deleteBlockRow($event) {
    this.seasonTicketService.deleteBlockRow($event.blockRow);
      // .then(() => this.loadBlockRowSeats());
  }

}
