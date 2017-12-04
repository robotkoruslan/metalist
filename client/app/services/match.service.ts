import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class MatchService {

  constructor(private http: HttpClient) { }

  fetchMatch(id) {
    return this.http.get('/api/matches/' + id)
      .map((response: Response) => response);
  }

  fetchMatchSeats(id) {
    return this.http.get('/api/matches/' + id + '/seats')
      .map((response: Response) => response);
  }

}
