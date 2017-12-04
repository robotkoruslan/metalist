import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TicketService {
  constructor(private http: HttpClient) {}

  fetchReservedSeats(matchId, sectorName): Observable<any> {
    return this.http.get('api/seats/reserved-on-match/' + matchId + '/sector/' + sectorName)
      .map((response: Response) => response);
  }

  getMyTickets() {
    return this.http.get('api/tickets/my')
      .map((response: Response) => response);
  }

  getPendingStatus() {
    return this.http.get('api/orders/payment-status')
      .map((response: Response) => response);
  }

  getStatistics(data): Observable<any> {
    console.log('getStatistics', data);
    return this.http.get('/api/tickets/statistics', {params: {date: data.date, metod: data.metod}})
      .map(res => res);
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
