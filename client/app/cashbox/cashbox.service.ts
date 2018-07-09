import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {SeasonTicket} from '../model/season-ticket.interface';

@Injectable()
export class CashboxService {

  constructor(private http: HttpClient) { }

  getTicketByAccessCode(accessCode): Observable<{seasonTicket: SeasonTicket, ticket: {}}> {
    return this.http.get<{seasonTicket: SeasonTicket, ticket: {}}>('api/tickets/abonticket/' + accessCode);
  }

  setTicketUsed(ticketId) {
    return this.http.get('api/tickets/useabonticket/' + ticketId);
  }

}
