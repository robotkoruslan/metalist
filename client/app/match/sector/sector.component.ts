import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { uniqBy, remove } from 'lodash';
import {TranslateService} from '@ngx-translate/core';

import {PriceSchemaService} from '../../services/price-schema.service';
import {CartService} from '../../services/cart.service';
import {MatchService} from '../../services/match.service';
import {AppConstant} from '../../app.constant';
import {TicketService} from '../../services/ticket.service';
import {Sector} from '../../model/sector.interface';
import {Seat} from '../../model/seat.interface';
import {PriceSchema} from '../../model/price-schema.interface';
import {Match} from '../../model/match.interface';
import {AuthService} from '../../services/auth.service';
import {PrintTicketService} from '../../services/print-ticket.service';
import { fromEvent } from 'rxjs/observable/fromEvent';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.less']
})

export class SectorComponent implements OnInit {

  match: Match;
  sector: Sector;
  reservedSeats: Seat[] = [];
  optimisticSeats = [];
  priceSchema: PriceSchema | {} = {};
  sectorPrice: string;
  message: string;
  matchId: string;
  sectorId: string;
  tribuneName: string;
  processedSeat: string;
  isMobile: boolean;
  tribune: string;

  tribuneNames = {
    ru: {north: 'Cевер', south: 'Юг', west: 'Запад', east: 'Восток'},
    uk: {north: 'Північна', south: 'Південна', west: 'Західна', east: 'Східна'}
  };
  constructor(private priceSchemaService: PriceSchemaService,
              private cartService: CartService,
              private route: ActivatedRoute,
              private matchService: MatchService,
              private ticketsService: TicketService,
              private authService: AuthService,
              private printTicketService: PrintTicketService,
              private translateService: TranslateService) {
    this.route.params.subscribe((params: any) => this.matchId = params.matchId);
    this.route.params.subscribe((params: any) => this.sectorId = params.sectorId);
    this.route.params.subscribe((params: any) => this.tribuneName = params.tribuneId);

  }

  ngOnInit() {
    this.getPrice();
    this.getReservedSeats();
    this.getSelectedSeats();
    this.isMobile = window.innerWidth <= 1240;
    this.tribune = this.getTribune();
    fromEvent(window, 'resize').map((event: any) => {
      this.isMobile = event.target.innerWidth <= 1240;
    }).subscribe();
  }

  getPrice() {
    this.matchService.fetchMatch(this.matchId)
      .subscribe((res) => {
        this.match = res;
        this.priceSchema = this.match.priceSchema.priceSchema;

        if (this.match.priceSchema.priceSchema.stadiumName === 'dinamo') {
          this.sector = AppConstant.StadiumDinamo['tribune_' + this.tribuneName]['sector_' + this.sectorId];
        } else {
          if (this.match.priceSchema.priceSchema.stadiumName === 'solar') {
            this.sector = AppConstant.StadiumSolar['tribune_' + this.tribuneName]['sector_' + this.sectorId];
          } else {
            this.sector = AppConstant.StadiumMetalist['tribune_' + this.tribuneName]['sector_' + this.sectorId];
          }
        }
        this.sectorPrice = this.priceSchemaService.getPriceBySector(this.tribuneName, this.sector.name, this.priceSchema);
      });
  }

  getReservedSeats() {
    const matchId = this.matchId,
      sectorName = this.sectorId;

    return this.ticketsService.fetchReservedSeats(matchId, sectorName)
      .subscribe(seats => {
        this.reservedSeats = seats;
        this.processedSeat = null;
      });
  }

  getSelectedSeats = () =>
    this.cartService.getCart()
      .subscribe(
        cart => this.optimisticSeats = cart.seats,
        err => console.log(err)
      )

  isSeatOptimistic = (slug) => this.optimisticSeats
    .find(({slug: seatSlug, match}) => seatSlug === slug && match.id === this.match.id)
  isSeatReserved = (slug) => this.reservedSeats.includes(slug)

  addClassByCheckSoldSeat(slug) {
    if (this.isSeatOptimistic(slug)) {
      return 'blockedSeat';
    }
    if (this.isSeatReserved(slug) && slug !== this.processedSeat) {
      return 'soldSeat';
    }
    return 'availableSeat';
  }

  toggleSeat({slug}) {
    this.message = '';
    const isSeatReserved = this.isSeatReserved(slug);
    const isSeatOptimistic = this.isSeatOptimistic(slug);
    if (isSeatOptimistic) {
      this.toggleOptimisticSeats(slug, false);
      this.cartService.removeSeatFromCart(slug, this.match.id)
        .subscribe(
          () => this.getReservedSeats(),
          error => {
            this.getReservedSeats();
            this.toggleOptimisticSeats(slug, true);
          }
        );
    } else {
      this.toggleOptimisticSeats(slug, true);
      this.cartService.addSeatToCart(slug, this.match.id)
        .subscribe(
          () => this.getReservedSeats(),
          error => {
            if (error.status === 409) {
              this.message = 'Это место уже занято.';
              this.getReservedSeats();
            }
            this.toggleOptimisticSeats(slug, false);
          }
        );
    }
  }

  toggleOptimisticSeats(slug, show) {
    this.processedSeat = slug;
    if (show) {
      const [sector, row, seat] = slug.match(/\d{1,2}/g);
      this.optimisticSeats.push({slug, seat, row, sector, match: this.match, price: this.sectorPrice});
    } else {
      this.optimisticSeats = this.optimisticSeats.filter(({slug: seatSlug}) => seatSlug !== slug);
    }
  }

  makeArrayFromNumber = (number)  => Array.from(Array(+number).keys()).map(x => x + 1);

  isSkybox() {
    const skyBoxes: any = ['SB_1', 'SB_2', 'SB_3_5', 'SB_6', 'SB_7', 'SB_8', 'SB_9', 'SB_10', 'SB_11' ];
    return this.sector ? skyBoxes.includes(this.sector.name) : false;
  }

  get isCashier() {
    return this.authService.isCashier();
  }

  pay() {
    this.cartService.pay()
      .subscribe(
        order => {
          this.printTicketService.print(order.tickets);
          this.getReservedSeats();
          this.getSelectedSeats();
        },
        err => console.log(err)
      );
  }

  getTribune() {
    let language = this.translateService.getBrowserLang();
    language = ['ru', 'uk'].includes(language) ? language : 'uk';
    return this.tribuneNames[language][this.tribuneName];
  }


  get firstUpperRow() {
    const sectorDividers: any = {
      '1': 19,
      '2': 20,
      '8': 20,
      '9': 19,
      '10': 15,
      '11': 15,
      '12': 15,
      '13': 15,
      '14': 15,
      '15': 15,
      '16': 15,
      '17': 15,
      '18': 15,
      '19': 15,
      '20': 15,
      '22': 9,
      '23': 9,
      '24': 9,
      '25': 9,
      '26': 9,
      '27': 9,
      '28': 9,
      '29': 9,
    };
    return sectorDividers[this.sector.name] || 1;
  }
}
