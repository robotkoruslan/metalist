import { Component, OnInit, Input  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from '../../services/match.service';

import {SharedDataService} from "../../services/shared-data.service";

@Component({
  selector: 'app-select-sector',
  templateUrl: './select-sector.component.html',
  styleUrls: ['./select-sector.component.css']
})
export class SelectSectorComponent implements OnInit {

  matchId: string;
  priceSchema: any;
  match: any;

  constructor(private router: Router, private dataService: SharedDataService) {
  }

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      this.match = data;
      this.priceSchema = this.match.priceSchema.priceSchema;
    })
  }

  goToSector = (sector) =>
    this.router.navigate(['sectors', this.match['_id'], sector.tribune, sector.sector]);
}
