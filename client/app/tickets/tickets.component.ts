import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import { TicketService } from '../services/ticket.service';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable';
import 'rxjs/add/operator/takeWhile';
import {uniq} from 'lodash';
import {PrintTicketService} from '../services/print-ticket.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.less'],
})
export class TicketsComponent implements OnInit, OnDestroy {

  data: any = [];
  intervalExists = true;

  constructor(private ticketsService: TicketService, private printService: PrintTicketService) {
  }
  ngOnInit() {
    this.getTickets();
    this.getPendingStatus();
  }

  ngOnDestroy() {
    this.intervalExists = false;
  }

  getTickets() {
    this.ticketsService.getMyTickets()
      .subscribe(
        response => this.data = this.prepareTickets(response),
        err => console.log(err)
      );
  }

  getPendingStatus() {
    IntervalObservable.create(5000)
      .takeWhile(value => this.intervalExists && value < 5)
      .subscribe(
        (data) => {
          return this.ticketsService.getPendingStatus()
            .subscribe(
              ({status}) => {
                if (!status) {
                  this.intervalExists = false;
                  this.getTickets();
                }
              },
            );
        },
      );
  }

  prepareTickets(data) {
    const matchIds = uniq(data.map(({match: {id : {id}}}) => id));
    const tickets = matchIds.map(id => ({match: {_id: id}, tickets: []}));
    data.forEach(({match, seat, ticketNumber, accessCode, amount}) => {
      const ticket = tickets.find(({match: {_id}}) => _id === match.id._id);
      ticket.match = match.id;
      ticket.tickets.push({...seat, ticketNumber, accessCode, match, amount});
    });
    return tickets;
  }

  print({ticketNumber}) {
    window.open(`api/tickets/ticket/${ticketNumber}`, '_blank');
  }

}
