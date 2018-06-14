import {Component, OnDestroy, OnInit} from '@angular/core';
import {SeasonTicketService} from '../../services/season-ticket.service';
import {TicketService} from '../../services/ticket.service';
import {Seat} from '../../model/seat.interface';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-season-ticket',
  templateUrl: './season-ticket.component.html',
  styleUrls: ['./season-ticket.component.css'],
  providers: [TicketService, SeasonTicketService]
})
export class SeasonTicketComponent implements OnInit, OnDestroy {

  public errorMessageSeat: string;
  public errorMessageBlockRow: string;
  public ticket: any = [];
  public seasonTickets: Seat[];
  public blockRowSeats: Seat[];

  private destroy$: Subject<boolean> = new Subject();

  constructor(private ticketsService: TicketService,
              private seasonTicketService: SeasonTicketService) {
  }

  ngOnInit() {
    this.loadSeasonTickets();
    this.loadBlockRowSeats();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public loadSeasonTickets(): void {
    this.seasonTicketService.loadSeasonTickets()
      .takeUntil(this.destroy$)
      .subscribe(response => this.seasonTickets = response.reverse());
    this.errorMessageSeat = '';
  }

  public loadBlockRowSeats(): void {
    this.seasonTicketService.loadBlockRowSeats()
      .takeUntil(this.destroy$)
      .subscribe(response => this.blockRowSeats = response.reverse());
    this.errorMessageBlockRow = '';
  }

  public addSeasonTicket(ticket): void {
    const slug = 's' + ticket.seat.sector + 'r' + ticket.seat.row + 'st' + ticket.seat.seat;

    this.seasonTicketService.createSeasonTicket(ticket, slug)
      .takeUntil(this.destroy$)
      .subscribe(
        () => this.loadSeasonTickets(),
        (err) => {
          this.errorMessageSeat = 'fail';
          if (err.status === 409) {
            this.errorMessageSeat = 'alreadyTaken';
          }
        });
  }

  public deleteSeasonTicket(slug): void {
    this.seasonTicketService.deleteSeasonTicket(slug)
      .takeUntil(this.destroy$)
      .subscribe(
        () => this.loadSeasonTickets(),
        () => this.errorMessageSeat = 'deleteReservationFail'
      );
  }

  public deleteBlockRow(blockRow): void {
    this.seasonTicketService.deleteBlockRow(blockRow)
      .takeUntil(this.destroy$)
      .subscribe(
        () => this.loadBlockRowSeats(),
        () => this.errorMessageBlockRow = 'deleteReservationFail'
      );
  }


  public addBlockRow(blockRow): void {
    this.seasonTicketService.addBlockRow(blockRow)
      .subscribe(
        () => this.loadBlockRowSeats(),
        () => this.errorMessageBlockRow = 'fail'
      );
  }

  public onExtendSeasonTicket(ticketId: string): void {
    this.seasonTicketService.extendSeasonTicket(ticketId)
      .subscribe((updatedTicket) => {
        this.seasonTickets = this.seasonTickets.map((ticket) => {
          return ticket._id === updatedTicket._id ? updatedTicket : ticket;
        });
      })
  }
}
