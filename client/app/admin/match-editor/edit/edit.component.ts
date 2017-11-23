import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  match: any = {};

  constructor() { }

  ngOnInit() {
  }

  // $onChanges(changes) {
  //   this.match = angular.copy(this.matchToEdit);
  //   this.priceSchemas = angular.copy(this.priceSchemas);
  //   this.allTeamLogos = angular.copy(this.allTeamLogos);
  //
  //   if (!this.matchToEdit.id) {
  //     this.match.date = this.date;
  //     this.match.priceSchema = this.priceSchemas[0];
  //   }
  //
  //   if (changes.allTeamLogos && this.currentFileName) {
  //     this.match.poster = 'assets/teamLogos/' + this.currentFileName;
  //   }
  // }
  //
  // update() {
  //   this.onChange({
  //     $event: {
  //       match: this.match
  //     }
  //   });
  // }
  //
  // upload() {
  //   let file = document.getElementById('file').files[0];
  //   this.currentFileName = file.name;
  //   if (file) {
  //     this.onUpload({
  //       $event: {
  //         file: file
  //       }
  //     });
  //   }
  //
  // }

}
