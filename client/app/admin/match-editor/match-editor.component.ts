import {Component, OnInit} from '@angular/core';
import {MatchEditorService} from '../../services/match-editor.service';
import {FileService} from '../../services/file.service';

import {Match} from '../../model/match.interface';

@Component({
  selector: 'app-match-editor',
  templateUrl: './match-editor.component.html',
  styleUrls: ['./match-editor.component.css']
})
export class MatchEditorComponent implements OnInit {

  nextMatches:Match[] = [];
  prevMatches:Match[] = [];
  matchToEdit:Match | null;
  message:string = '';

  constructor(private matchEditorService:MatchEditorService, private fileService:FileService) {
  }

  ngOnInit() {
    this.loadNextMatches();
    this.loadPrevMatches();
    this.getTeamLogos();
  }

  setMatchToEdit(match) {
    this.matchToEdit = match;
  }

  loadNextMatches = () => this.matchEditorService.loadNextMatches()
    .subscribe(
      (res) => this.nextMatches = res,
      err => console.log(err)
    );

  loadPrevMatches = () => this.matchEditorService.loadPrevMatches()
    .subscribe(
      res => this.prevMatches = res,
      err => console.log(err)
    );

  deleteMatch = (id:string) => this.matchEditorService.deleteMatch(id)
    .subscribe(
      () => this.prevMatches = this.prevMatches.filter(match => match.id !== id),
      (err) => console.log('Something went wrong', err)
    );

  saveMatch(match) {
    if (match.id) {
      this.matchEditorService.editMatch(match)
        .subscribe(
          () => {
            this.loadNextMatches();
            this.matchToEdit = null;
            this.message = 'Матч был успешно обновлен';
          },
          err => console.log(err)
        )
    } else {
      this.matchEditorService.createMatch(match)
        .subscribe(
          () => {
            this.loadNextMatches();
            this.matchToEdit = null;
            this.message = `Процесс создания сидений для матча запущен. Это может занять 5-10 минут. 
            При успешном создании появится дата матча на домашней странице.`;
          },
          err => console.log(err)
        );
    }
  }

  getTeamLogos = () => this.fileService.loadTeamLogos();

  closeForm = () => this.matchToEdit = null;

}
