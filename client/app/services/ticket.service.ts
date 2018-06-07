import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Ticket} from '../model/ticket.interface';
import {SeasonTicket} from '../model/season-ticket.interface';

@Injectable()
export class TicketService {
  constructor(private http: HttpClient) {}

  fetchReservedSeats(matchId, sectorName): Observable<any> {
    return this.http.get('api/seats/reserved-on-match/' + matchId + '/sector/' + sectorName)
      .map((response: Response) => response);
  }

  getMyTickets(): Observable<{tickets: Ticket[], seasonTickets: SeasonTicket[]}> {
    return this.http.get<{tickets: Ticket[], seasonTickets: SeasonTicket[]}>('api/tickets/my');
  }

  getPendingStatus(): Observable<{status: boolean}> {
    return this.http.get<{status: boolean}>('api/orders/payment-status');
  }

  getStatistics(data): Observable<any> {
    return this.http.get('/api/tickets/statistics', {params: {date: data.date, metod: data.metod}});
  }
  // getStatistics(data): Observable<any> {
  //   return this.http.get('/api/posts')
  //     .map(res => res.json());
  // }

  removeTicket(ticketId): Observable<any> {
    return this.http.delete(`/api/tickets/${ticketId}`);
  }

}
