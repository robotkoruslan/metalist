import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class MatchEditorService {

  constructor(private http: Http) { }

  loadNextMatches() {
    return this.http.get('/api/matches/next/')
      .map((response: Response) => response.json());
      // .then(response => response.data);
  }

  loadPrevMatches() {
    return this.http.get('/api/matches/prev/')
      .map((response: Response) => response.json());
      // .then(response => response.data);
  }

  createMatch(match) {
    return this.http.post('/api/matches', match)
      .map((response: Response) => response.json());
      // method: 'POST',
      // url: '/api/matches',
      // data: match,
      // headers: {'Accept': 'application/json'}
    // });
  }

  editMatch(match) {
    return this.http.put('/api/matches/' , match._id)
      .map((response: Response) => response.json());
      // method: 'PUT',
      // url: '/api/matches/' + match._id,
      // data: match,
      // headers: {'Accept': 'application/json'}
    // });
  }

  deleteMatch(matchId) {
    return this.http.delete('/api/matches/' + matchId)
      .map((response: Response) => response.json());
      // method: 'delete',
      // url: '/api/matches/' + matchId,
      // headers: {'Accept': 'application/json'}
    // });
  }

}
