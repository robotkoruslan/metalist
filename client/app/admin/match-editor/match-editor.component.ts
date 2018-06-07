import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatchEditorService} from '../../services/match-editor.service';
import {FileService} from '../../services/file.service';
import moment from 'moment-timezone';
import {Match} from '../../model/match.interface';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-match-editor',
  templateUrl: './match-editor.component.html',
  styleUrls: ['./match-editor.component.css']
})
export class MatchEditorComponent implements OnInit, OnDestroy {

  public nextMatches: Match[] = [];
  public prevMatches: Match[] = [];
  public matchToEdit: Match | Partial<Match> | null;
  public message = '';

  private destroy$: Subject<boolean> = new Subject();

  constructor(private matchEditorService: MatchEditorService, private fileService: FileService) {
  }

  ngOnInit() {
    this.loadNextMatches();
    this.loadPrevMatches();
    this.getTeamLogos();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  setMatchToEdit(match = {date: moment(new Date()).toISOString()}) {
    this.message = '';
    this.matchToEdit = match;
  }

  private loadNextMatches(): void {
    this.matchEditorService.loadNextMatches()
      .takeUntil(this.destroy$)
      .subscribe(
        (res: Match[]) => this.nextMatches = res,
        (err) => console.log(err)
      );
  }

  private loadPrevMatches(): void {
    this.matchEditorService.loadPrevMatches()
      .takeUntil(this.destroy$)
      .subscribe(
        (res: Match[]) => this.prevMatches = res,
        err => console.log(err)
      );
  }

  public deleteMatch(id: string): void {
    this.message = '';
    this.matchEditorService.deleteMatch(id)
      .takeUntil(this.destroy$)
      .subscribe(
        () => {
          this.prevMatches = this.prevMatches.filter(match => match.id !== id);
          this.nextMatches = this.nextMatches.filter(match => match.id !== id);
          this.matchToEdit = this.matchToEdit && this.matchToEdit.id === id ? null : this.matchToEdit;
          this.message = 'deleteSuccess';
        },
        () => this.message = 'deleteFail'
      );
  }

  saveMatch(match) {
    this.message = '';
    if (match.id) {
      this.matchEditorService.editMatch(match)
        .subscribe(
          () => {
            this.loadNextMatches();
            this.matchToEdit = null;
            this.message = 'editSuccess';
          },
          err => console.log(err)
        );
    } else {
      this.matchEditorService.createMatch(match)
        .subscribe(
          () => {
            this.loadNextMatches();
            this.matchToEdit = null;
            this.message = 'seatsCreationProcess';
          },
          err => console.log(err)
        );
    }
  }

  getTeamLogos = () => this.fileService.loadTeamLogos();

  closeForm = () => this.matchToEdit = null;

}
