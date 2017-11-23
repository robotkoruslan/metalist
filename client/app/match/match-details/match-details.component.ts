import { Component, OnInit, OnChanges } from '@angular/core';

import moment from 'moment-timezone';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})
export class MatchDetailsComponent implements OnInit, OnChanges {

  matchDetails: any = {};
  match: any = {};

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes.match) {
      if (!this.match.id) {
        this.matchDetails = {};
      }
      if (this.match.id) {
        this.matchDetails = this.match;
        this.matchDetails.formattedDate = moment(this.matchDetails.date).locale('ru').tz('Europe/Kiev').format('DD MMMM YYYY');
        this.matchDetails.time = moment(this.matchDetails.date).tz('Europe/Kiev').format('HH:mm');
      }
    }
  }

}
