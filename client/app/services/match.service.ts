import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class MatchService {

  constructor(private http: Http) { }

  fetchMatch(id) {
    return this.http.get('/api/matches/' + id)
      .map((response: Response) => response.json());
  }

  fetchMatchSeats(id) {
    return this.http.get('/api/matches/' + id + '/seats')
      .map((response: Response) => response.json());
  }

}
