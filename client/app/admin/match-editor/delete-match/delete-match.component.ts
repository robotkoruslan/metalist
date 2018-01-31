import {Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'delete-match',
  templateUrl: './delete-match.component.html',
  styleUrls: ['./delete-match.component.css']
})

export class DeleteMatchComponent {
  matchId: string;

  @Output() deleteMatch: EventEmitter<any> = new EventEmitter();

  constructor() {}

  handleClick() {
    this.deleteMatch.emit(this.matchId);
    this.matchId = '';
  }
}
