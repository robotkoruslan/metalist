import {Component, OnDestroy, OnInit} from '@angular/core';
import { TicketService } from '../services/ticket.service';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable';
import 'rxjs/add/operator/takeWhile';
@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit, OnDestroy {

  tickets: any = [];
  intervalExists = true;

  constructor(private ticketsService: TicketService) {
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
        response => this.tickets = response,
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
}
