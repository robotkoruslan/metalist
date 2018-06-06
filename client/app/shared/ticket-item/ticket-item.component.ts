import {Component, Input, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material';
import {TicketDialogComponent} from '../ticket-dialog/ticket-dialog.component';
import {TypeTicket} from '../../model/type-ticket';

@Component({
  selector: 'ticket-item',
  templateUrl: 'ticket-item.component.html',
  styleUrls: ['./ticket-item.component.less']
})

export class TicketItemComponent {

  public types = TypeTicket;

  @Input() ticket: any;
  @Input() type: TypeTicket | undefined;
  @Input() index: number;
  @Output() onClick = new EventEmitter();

  constructor(private dialog: MatDialog) {
  }

  handlePrint() {
    this.onClick.emit({ticket: this.ticket});
  }

  public openTicket(): void {
    if (!this.ticket._id && !this.ticket.id) {
      return;
    }
    this.dialog.open(TicketDialogComponent, {
      data: {
        'ticket': this.ticket,
        'type': this.type
      },
      maxWidth: '100vw'
    });
  }
}
