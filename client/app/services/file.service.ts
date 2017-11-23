import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class FileService {

  constructor(private http: Http) { }

  loadTeamLogos() {
    return this.http.get('/api/file/teamLogos/');
      // .then(response => response.data);
  }

  upload(file) {
    return this.http.post('/api/file/upload', file);
      // method: 'POST',
      // url: '/api/file/upload',
      // data: file,
      // headers: {
      //   'Content-Type': undefined
      // }
    // });
  }

}
