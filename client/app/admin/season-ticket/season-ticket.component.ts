import {Component, OnInit} from '@angular/core';
import {SeasonTicketService} from '../../services/season-ticket.service';
import {TicketService} from '../../services/ticket.service';
import {Seat} from "../../model/seat.interface";

@Component({
  selector: 'app-season-ticket',
  templateUrl: './season-ticket.component.html',
  styleUrls: ['./season-ticket.component.css'],
  providers: [TicketService, SeasonTicketService]
})
export class SeasonTicketComponent implements OnInit {

  errorMessageSeat: string;
  errorMessageBlockRow: string;
  lastTickets: any = [];
  ticket: any = [];
  seasonTickets: Seat[];
  blockRowSeats: Seat[];

  constructor(private ticketsService: TicketService, private seasonTicketService: SeasonTicketService) {
  }

  ngOnInit() {
    this.loadSeasonTickets();
    this.loadBlockRowSeats();
  }

  loadSeasonTickets() {
    this.seasonTicketService.loadSeasonTickets()
      .subscribe(response => this.seasonTickets = response.reverse());
    this.errorMessageSeat = '';
  }

  loadBlockRowSeats() {
    this.seasonTicketService.loadBlockRowSeats()
      .subscribe(response => this.blockRowSeats = response.reverse());
    this.errorMessageBlockRow = '';
  }

  addSeasonTicket(ticket) {
    const slug = 's' + ticket.sector + 'r' + ticket.row + 'st' + ticket.seat;

    this.seasonTicketService.createSeasonTicket(ticket, slug)
      .subscribe(
        () => this.loadSeasonTickets(),
        (err) => {
          this.errorMessageSeat = 'Место не было зарезервировано. Что-то пошло не так';
          if (err.status === 409) {
            this.errorMessageSeat = 'Это место уже занято';
          }
        })
  }

  deleteSeasonTicket(slug) {
    this.seasonTicketService.deleteSeasonTicket(slug)
      .subscribe(
        () => this.loadSeasonTickets(),
        () => this.errorMessageBlockRow = 'Резервация места не была снята. Что-то пошло не так'
      )
  }

  deleteBlockRow(blockRow) {
    this.seasonTicketService.deleteBlockRow(blockRow)
      .subscribe(
        () => this.loadBlockRowSeats(),
        () => this.errorMessageBlockRow = 'Резервация ряда не была снята. Что-то пошло не так'
      )
  }


  addBlockRow = (blockRow) => {
    this.seasonTicketService.addBlockRow(blockRow)
      .subscribe(
        () => this.loadBlockRowSeats(),
        () => this.errorMessageBlockRow = 'Ряд не был зарезервирован. Что-то пошло не так'
      );
  }
}
