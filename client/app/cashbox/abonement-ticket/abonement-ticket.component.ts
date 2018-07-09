import {Component, OnDestroy, OnInit} from '@angular/core';
import {CashboxService} from '../cashbox.service';
import {SeasonTicketService} from '../../services/season-ticket.service';
import {Ticket} from '../../model/ticket.interface';
import {Subject} from 'rxjs/Subject';
import {PrintTicketService} from '../../services/print-ticket.service';
import 'rxjs/add/operator/finally';
import {SeasonTicket} from '../../model/season-ticket.interface';

@Component({
  selector: 'app-abonement-ticket',
  templateUrl: './abonement-ticket.component.html',
  styleUrls: ['./abonement-ticket.component.css']
})
export class AbonementTicketComponent implements OnInit, OnDestroy {

  public accessCode: string;
  public seatMessage: string;
  public abonementMessage: string;
  public seasonTickets: Ticket[];
  public preSellTicket;
  public ticket: Ticket[];
  public openedSeasonTicket: SeasonTicket;

  private destroy$: Subject<boolean> = new Subject();

  constructor(private cashboxService: CashboxService,
              private seasonTicketService: SeasonTicketService,
              private printTicketService: PrintTicketService) {
  }

  ngOnInit() {
    this.loadSeasonTickets();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  loadSeasonTickets() {
    this.seasonTicketService.loadSeasonTickets()
      .takeUntil(this.destroy$)
      .subscribe(
        response => this.seasonTickets = response,
        err => console.log(err)
      );
  }

  handleDeleteTicket(ticket) {
    this.seasonTicketService.deleteSeasonTicket(ticket.slug)
      .takeUntil(this.destroy$)
      .subscribe(
        result => this.loadSeasonTickets(),
        err => {
          console.log(err);
          this.abonementMessage = 'fail';
        }
      );
  }

  regTicket(accessCode) {
    this.seatMessage = '';
    this.cashboxService.getTicketByAccessCode(accessCode)
      .takeUntil(this.destroy$)
      .subscribe(
        ({seasonTicket, ticket}) => {
          this.preSellTicket = ticket;
          this.openedSeasonTicket = seasonTicket;
        },
        (err) => {
          this.unsetOpenedTickets();
          this.seatMessage = 'notFound';
          console.log(err);
        }
      );
  }

  createSeasonTicket() {
    this.seatMessage = '';
    const {seat} = this.preSellTicket;
    const slug = `s${seat.sector}r${seat.row}st${seat.seat}`;
    this.seasonTicketService.registrationSeasonTicket(this.preSellTicket._id, slug)
      .takeUntil(this.destroy$)
      .finally(() => this.loadSeasonTickets())
      .subscribe(
        () => {
          this.seatMessage = 'success';
          this.cashboxService.setTicketUsed(this.preSellTicket._id)
            .takeUntil(this.destroy$)
            .subscribe((ticket) => {
              this.preSellTicket = ticket;
            });
        },
        err => {
          this.seatMessage = 'fail';
          if (err.status === 409) {
            this.seatMessage = 'alreadyTaken';
          }
        }
      );
  }

  public printTicket(ticket = this.openedSeasonTicket): void {
    this.printTicketService.print([ticket]);
  }

  public cancelSearchForm(): void {
    this.unsetOpenedTickets();
    this.accessCode = '';
    this.seatMessage = '';
  }

  private unsetOpenedTickets(): void {
    this.openedSeasonTicket = null;
    this.preSellTicket = null;
  }

}
