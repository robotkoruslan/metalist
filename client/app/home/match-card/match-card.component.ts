import {Component, Input} from '@angular/core';
import {Match} from '../../model/match.interface';

// import 'rxjs/add/operator/map';


@Component({
  selector: 'match-card',
  template: `
    <div class="card-wrapper">
      <span *ngIf="match?.date" class="match-date">{{match.date | localeDate:'DD MMMM YYYY'}}</span>
      <span *ngIf="match?.date" class="match-time">{{match.date | localeDate:'HH:mm'}}</span>
      <div class="match-metalist">
        <logo-circle dimension="140" [right]="false"></logo-circle>
        <span>{{'common.metalist' | translate}}<br/>1925</span>
      </div>
      <span class="match-vs">VS</span>
      <div class="match-rival">
        <logo-circle dimension="140" [right]="true" [image]="match?.poster"></logo-circle>
        <span>{{match?.rival}}</span>
      </div>
      <button class="classic" [routerLink]="'/match/' + match?.id">{{'home.buyTicket' | translate}}</button>
      <span class="match-address">{{'match.stadiumMetalist' | translate}}</span>
      <span class="match-address">{{'match.address' | translate}}</span>
      <span class="match-address">
        <img src="assets/images/subway.png" alt="subway">{{'match.subway' | translate}}
      </span>
    </div>
  `,
  styleUrls: ['./match-card.component.less']
})

export class MatchCardComponent {
  @Input() match: Match;

}
