import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  matchId: string;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => console.log('MatchComponent 0 ', params.matchId));
    this.route.params.subscribe(params => this.matchId = params.matchId);
    // this.route.params.pluck('matchId').subscribe(matchId => console.log('MatchComponent 1 ',matchId));
  }
  // constructor() { }

  ngOnInit() {
  }

}
