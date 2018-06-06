import {Component, OnDestroy, OnInit} from '@angular/core';
import {TicketService} from '../services/ticket.service';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable';
import 'rxjs/add/operator/takeWhile';
import {uniq, compact} from 'lodash';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import {TypeTicket} from '../model/type-ticket';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.less'],
})
export class TicketsComponent implements OnInit, OnDestroy {

  public tickets: any = [];
  public seasonTickets: any = [];
  public intervalExists = true;
  public types = TypeTicket;

  private destroy$: Subject<boolean> = new Subject();

  constructor(private ticketsService: TicketService) {
  }

  ngOnInit() {
    this.getTickets();
    this.getPendingStatus();
  }

  ngOnDestroy() {
    this.intervalExists = false;
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getTickets() {
    this.ticketsService.getMyTickets()
      .takeUntil(this.destroy$)
      .subscribe(
        ({tickets, seasonTickets}) => {
          this.tickets = this.prepareTickets(tickets);
          this.seasonTickets = seasonTickets;
        },
        err => console.log(err)
      );
  }

  getPendingStatus() {
    IntervalObservable.create(5000)
      .takeWhile(value => this.intervalExists && value < 5)
      .subscribe(
        () => {
          return this.ticketsService.getPendingStatus()
            .takeUntil(this.destroy$)
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
    const matchIds = compact(
      uniq(
        data.map(({match}) => (match && match.id) ? match.id.id : null)
      )
    );
    const tickets = matchIds.map(id => ({match: {_id: id}, tickets: []}));

    data.forEach(
      ({match, seat, ticketNumber, accessCode, amount}) => {
        const ticket = tickets.find(({match: {_id}}) =>
          match && match.id ? _id === match.id._id : false);
        if (!ticket) {
          return;
        }
        ticket.match = match.id;
        ticket.tickets.push({...seat, ticketNumber, accessCode, match, amount});
      });

    return tickets.filter((ticket) => ticket.match._id && ticket.tickets.length);
  }

  print({ticketNumber}) {
    window.open(`api/tickets/ticket/${ticketNumber}`, '_blank');
  }

}
