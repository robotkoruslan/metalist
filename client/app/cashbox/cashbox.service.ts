import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CashboxService {

  constructor(private http: Http,) { }

  getTicketByAccessCode(accessCode) {
    return this.http.get('api/tickets/abonticket/' + accessCode)
      .map((response: Response) => {response.json();})
      .subscribe( (res) => res);
  }

  setTicketUsed(ticketId) {
    return this.http.get('api/tickets/useabonticket/' + ticketId)
      .map((response: Response) => {response.json();})
      .subscribe( (res) => res);
  }

}
