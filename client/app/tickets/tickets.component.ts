import { Component, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  tickets: any = [];
  isLoading: boolean = false;

  constructor(private ticketsService: TicketService) { }

  ngOnInit() {
    this.getTickets();
    // this.stopTime = this.$interval(this.getPendingStatus.bind(this), 1000);
    // this.$scope.$on('$destroy', this.stopHandling.bind(this));
  }


  getPendingStatus() {
    this.ticketsService.getPendingStatus();
      // .then(status => {
      //   this.isLoading = status;
      //   if (!status) {
      //     this.stopHandling();
      //     this.getTickets();
      //   }
      // });
  }

  // stopHandling() {
  //   this.$interval.cancel(this.stopTime);
  // }

  getTickets() {
    this.ticketsService.getMyTickets();
      // .then(tickets => {
      //   this.tickets = tickets;
      // });
  }

}
