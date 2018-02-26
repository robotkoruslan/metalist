import { Component, OnInit } from '@angular/core';
import { MatchEditorService } from '../services/match-editor.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import moment from 'moment-timezone';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  matches: any = [];

  constructor(private matchEditorService: MatchEditorService,) { }

  ngOnInit() {
    this.loadMatches();
  }

  loadMatches() {
    return this.matchEditorService.loadNextMatches()
      .map(matches => {
        this.matches = matches;
      }).subscribe();
  }

}
