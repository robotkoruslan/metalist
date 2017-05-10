import template from './season-ticket-list.html';

class SeasonTicketListController {
  constructor() {
    this.tickets = [];
  }

  $onChanges(changes) {
    if ( changes.seasonTickets ) {
      this.tickets = this.seasonTickets;
    }
  }

  deleteTicket(ticket) {
    this.onDelete({$event: { slug: ticket.slug }});
  }
}

let seasonTicketListComponent = {
  templateUrl: template,
  controller: SeasonTicketListController,
  bindings: {
    seasonTickets: '<',
    onDelete: '&'
  }
};

export default seasonTicketListComponent;