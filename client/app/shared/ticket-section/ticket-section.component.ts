import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Ticket} from '../../model/ticket.interface';
import {Match} from '../../model/match.interface';

@Component({
  selector: 'ticket-section',
  template: `
    <div class="ticket-section-wrapper">
      <div style="width: 320px; margin:0 auto;">
        <circle-tab [rival]="match.rival" [image]="match.poster"></circle-tab>
      </div>
      <ng-content></ng-content>
      <div class="tickets-wrapper">
        <ticket-item *ngFor="let ticket of tickets; let i = index"
                     [ticket]="ticket"
                     [type]="type"
                     [index]="i + 1" (onClick)="processClick($event)">
        </ticket-item>
      </div>
    </div>
  `,
  styleUrls: ['./ticket-section.component.less']
})

export class TicketSectionComponent {
  @Input() tickets: Ticket[];
  @Input() match: Match;
  @Input() type: string;
  @Output() handleClick = new EventEmitter();

  processClick({slug, ticketNumber}) {

    this.handleClick.emit(slug ? {slug, matchId: this.match.id} : ticketNumber);
  }
}
