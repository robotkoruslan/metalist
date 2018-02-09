import {Component, Input, OnChanges} from '@angular/core';

import moment from 'moment-timezone';
import {Match} from '../../model/match.interface';

interface MatchDetails extends Match {
  formattedDate: string,
  time: string
}

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.less']
})
export class MatchDetailsComponent implements OnChanges {

  @Input() matchDetails: MatchDetails;
  @Input() stadiumName: string;

  ngOnChanges(changes) {
    if (changes.matchDetails.currentValue) {
      this.matchDetails.formattedDate = moment(this.matchDetails.date)
        .locale('ru').tz('Europe/Kiev').format('DD MMMM YYYY');
      this.matchDetails.time = moment(this.matchDetails.date).tz('Europe/Kiev').format('HH:mm');
    }
  }

}
