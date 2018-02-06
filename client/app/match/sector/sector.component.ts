import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { uniqBy, remove } from 'lodash';
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
import {Ticket} from '../../model/ticket.interface';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.less']
})

export class SectorComponent implements OnInit {

  match: Match;
  sector: Sector;
  tickets: Ticket[] = [];
  reservedSeats: Seat[] = [];
  selectedSeats: Seat[] = [];
  optimisticSeats = [];
  priceSchema: PriceSchema | {} = {};
  sectorPrice: string = '';
  rowRow: string = 'Ряд';
  message: string = '';
  matchId: string;
  sectorId: string;
  tribuneName: string;
  slug: string;
  show = false;
  addresses = {
    solar: 'Стадион Солнечный. Пятихатки, Белгородское шоссе',
    dinamo: 'Стадион Динамо. Ул. Динамовская, 3, станция метро Научная',
    metalist: 'Стадион Металлист. Ул. Плехановская, 65, станция метро Спортивная / Метростроителей',
  };

  constructor(private priceSchemaService: PriceSchemaService,
              private cartService: CartService,
              private route: ActivatedRoute,
              private matchService: MatchService,
              private ticketsService: TicketService,
              private authService: AuthService,
              private printTicketService: PrintTicketService,) {
    this.route.params.subscribe((params: any) => this.matchId = params.matchId);
    this.route.params.subscribe((params: any) => this.sectorId = params.sectorId);
    this.route.params.subscribe((params: any) => this.tribuneName = params.tribuneId);

  }

  ngOnInit() {
    this.getPrice();
    this.updateSeatsData();
  }

  updateSeatsData = (slug?: string) => {
    if (slug) {
      this.toggleOptimisticSeats(slug, false);
    }
    this.getReservedSeats();
    this.getSelectedSeats();
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
      });
  }

  getSelectedSeats = () =>
    this.cartService.getCart()
      .subscribe(
        cart => this.selectedSeats = cart.seats,
        err => console.log(err)
      )

// @TODO need verification
  updateReservedTickets() {
    // this.getReservedSeats();
    this.getSelectedSeats();
  }

  addClassByCheckSoldSeat(slug) {
    const optimisticSeat = this.optimisticSeats.find(({slug: seatSlug}) => seatSlug === slug);

    if (optimisticSeat) {
      return optimisticSeat.show ? 'blockedSeat' : 'imgSeatsStyle';
    }
    if (this.reservedSeats.includes(slug)) {
      const checkSeat = this.selectedSeats.find(seat => seat.slug === slug && seat.match.id === this.match.id);
      return checkSeat ? 'blockedSeat' : 'soldSeat';
    }

    return 'imgSeatsStyle';
  }

  toggleSeat(slug) {
    const checkSeat = this.selectedSeats.find(seat => seat.slug === slug && seat.match.id === this.match.id);
    this.message = '';
    if (checkSeat && this.reservedSeats.includes(slug)) {
      this.toggleOptimisticSeats(slug, false);
      this.cartService.removeSeatFromCart(slug, this.match.id)
        .subscribe(
          () => this.updateSeatsData(),
          error => {
            console.log(error);
            this.toggleOptimisticSeats(slug, true);
          }
        );
    } else if (!this.reservedSeats.includes(slug)) {
      this.toggleOptimisticSeats(slug, true);
      this.cartService.addSeatToCart(slug, this.match.id)
        .subscribe(
          () => this.updateSeatsData(),
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
    const optimisticSeat = this.optimisticSeats.find(({slug: seatSlug}) => seatSlug === slug);
    if (optimisticSeat) {
      optimisticSeat.show = show;
    } else {
      const [sector, row, seat] = slug.match(/\d{1,2}/g);
      this.optimisticSeats.push({slug, seat, row, sector, match: this.match, show});
    }
  }

  get seats() {
    this.selectedSeats = this.selectedSeats.map(seat => {
      const optimisticSeat = this.optimisticSeats.find(({slug}) => slug === seat.slug);
      return {...optimisticSeat, ...seat};
    });
    const seats = uniqBy(this.selectedSeats.concat(this.optimisticSeats), 'slug');
    remove(seats, seat => seat.hasOwnProperty('show') ? !seat.show : false);
    return seats;
  }

  getFirstUpperRow(sectorNumber) {
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
    return sectorDividers[sectorNumber] || 1;
  }

  // makeArrayFromNumber (number) {
  //   return [...Array(parseInt(number) + 1).keys()].filter(Boolean);
  // }

  makeArrayFromNumber(number) {
    const seats = [];
    for (let i = 1; i <= number; i++) {
      seats.push(i);
    }
    return seats;
  }

  isSkybox() {
    const skyBoxes: any = ['SB_1', 'SB_2', 'SB_3_5', 'SB_6', 'SB_7', 'SB_8', 'SB_9', 'SB_10', 'SB_11' ];
    return this.sector ? skyBoxes.includes(this.sector.name) : false;
  }

  isCashier = () => this.authService.isCashier();

  pay() {
    this.cartService.pay()
      .subscribe(
        order => {
          this.printTicketService.print(order.tickets);
          this.updateSeatsData();
        },
        err => console.log(err)
      );
  }

}
