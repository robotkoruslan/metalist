import { Component, OnInit } from '@angular/core';
import { CashboxService } from '../cashbox.service';
import { SeasonTicketService } from '../../services/season-ticket.service';

@Component({
  selector: 'app-abonement-ticket',
  templateUrl: './abonement-ticket.component.html',
  styleUrls: ['./abonement-ticket.component.css']
})
export class AbonementTicketComponent implements OnInit {

  accessCode: string;
  errorMessageSeat: string;
  seasonTickets: any = {};
  preSellTicket: any = {};
  lastTickets: any = [];
  ticket: any = [];
  currentData: Date = new Date();

  constructor(private cashboxService: CashboxService, private seasonTicketService: SeasonTicketService) { }

  ngOnInit() {
  }

  loadSeasonTickets() {
    // this.seasonTicketService.loadSeasonTickets().then(response => this.seasonTickets = response.data);
    this.errorMessageSeat = '';
  }

  deleteTicket($event) {
    this.seasonTicketService.deleteSeasonTicket($event.slug);
      // .then(() => {
      //   this.loadSeasonTickets();
      // });
  }

  regTicket(accessCode) {
    this.cashboxService.getTicketByAccessCode(accessCode);
      // .then(response => {
      //   this.preSellTicket = response;
      // });
  }

  createSeasonTicket() {
    const slug = 's' + this.preSellTicket.seat.sector + 'r' + this.preSellTicket.seat.row + 'st' + this.preSellTicket.seat.seat;
    const ticket = this.preSellTicket.seat;
    // ticket.reservedUntil = this.endSeasonDate;
    ticket.accessCode = this.preSellTicket.accessCode;
    this.seasonTicketService.createSeasonTicket(ticket, slug);
      // .then(() => {
      //   this.cashboxService.setTicketUsed(this.preSellTicket._id)
      // })
      // .catch((err) => {
      //   if (err.status === 409) {
      //     this.errorMessageSeat = 'Это место уже занято.';
      //   }
      // });
  }

}
