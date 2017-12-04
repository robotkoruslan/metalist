import { Component, OnInit, Input  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-select-sector',
  templateUrl: './select-sector.component.html',
  styleUrls: ['./select-sector.component.css']
})
export class SelectSectorComponent implements OnInit {

  masterName: string;
  matchId: string;
  priceSchema: any;
  match: any;

  constructor(private route: ActivatedRoute, private matchService: MatchService, private router: Router) {
    // this.route.params.subscribe(params => console.log('-- constructor SelectSectorComponent ', params.matchId));
    this.route.params.subscribe(params => this.matchId = params.matchId);
    // this.route.params.pluck('matchId').subscribe(matchId => console.log('MatchComponent 1 ',matchId));
  }

  ngOnInit() {

    // console.log(' -- 0 ngOnInit SelectSectorComponent', this.matchId);

    this.matchService.fetchMatch(this.matchId)
      .subscribe((res) => {
        this.match = res;
        this.priceSchema = this.match.priceSchema.priceSchema;
        // console.log('-- 1 ngOnInit SelectSectorComponent this.priceSchema ', this.priceSchema);
      });
  }

  goToSector(sector) {
    // this.router.navigate(['login']);
    // this.router.navigate(['register']);

    this.router.navigate(['sectors', this.matchId, sector.tribune, sector.sector],
      // {
      //   queryParams: {
      //     'tribuneId': sector.tribune,
      //     'sectorId': sector.sector
      //   }
      // }
    );

    console.log('goToSector', sector);
  }

}
