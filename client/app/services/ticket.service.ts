import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TicketService {
  constructor(private http: Http) {}

  fetchReservedSeats(matchId, sectorName): Observable<any> {
    return this.http.get('api/seats/reserved-on-match/' + matchId + '/sector/' + sectorName)
      .map((response: Response) => response.json());
  }

  getMyTickets() {
    return this.http.get('api/tickets/my')
      .map((response: Response) => response.json());
  }

  getPendingStatus() {
    return this.http.get('api/orders/payment-status')
      .map((response: Response) => response.json());
  }

  getStatistics(data): Observable<any> {
    console.log('getStatistics', data);
    return this.http.get('/api/tickets/statistics', {params: {date: data.date, metod: data.metod}})
      .map(res => res.json());
  }
  // getStatistics(data): Observable<any> {
  //   return this.http.get('/api/posts')
  //     .map(res => res.json());
  // }

  // removeTicket(ticketId): Observable<any> {
  //   return this.http.delete('/api/tickets/', ticketId)
  //     .map((response: Response) => response.json());
  // }

}
