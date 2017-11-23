import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-season-ticket-list',
  templateUrl: './season-ticket-list.component.html',
  styleUrls: ['./season-ticket-list.component.css']
})
export class SeasonTicketListComponent implements OnInit, OnChanges {

  tickets: any = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    // if ( changes.seasonTickets ) {
    //   this.tickets = this.seasonTickets;
    // }
  }

  // deleteTicket(ticket) {
  //   this.onDelete({$event: { slug: ticket.slug }});
  // }

}
