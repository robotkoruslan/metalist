import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Ticket} from '../../model/ticket.interface';
import {Match} from '../../model/match.interface';
import {SeasonTicket} from '../../model/season-ticket.interface';
import {TypeTicket} from '../../model/type-ticket';

@Component({
  selector: 'ticket-section',
  templateUrl: 'ticket-section.component.html',
  styleUrls: ['./ticket-section.component.less']
})

export class TicketSectionComponent {

  public types = TypeTicket;

  @Input() tickets: Ticket[] | SeasonTicket[];
  @Input() match: Match | undefined;
  @Input() type: TypeTicket;
  @Output() handleClick = new EventEmitter();

  processClick({slug, ticket}) {
    this.handleClick.emit(slug ? {slug, matchId: this.match.id} : ticket);
  }
}
