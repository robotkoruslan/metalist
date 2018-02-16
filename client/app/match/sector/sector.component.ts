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
  reservedSeats: Seat[] = [];
  optimisticSeats = [];
  priceSchema: PriceSchema | {} = {};
  sectorPrice: string;
  message: string;
  matchId: string;
  sectorId: string;
  tribuneName: string;
  processedSeat: string;

  tribuneNames = {north: 'Cеверная', south: 'Южная', west: 'Западная', east: 'Восточная'};
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
    return 'imgSeatsStyle';
  }

  toggleSeat(slug) {
    this.message = '';
    const isSeatReserved = this.isSeatReserved(slug);
    const isSeatOptimistic = this.isSeatOptimistic(slug);
    if (isSeatOptimistic) {
      this.toggleOptimisticSeats(slug, false);
      this.cartService.removeSeatFromCart(slug, this.match.id)
        .subscribe(
          () => this.getReservedSeats(),
          error => {
            console.log(error);
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

  get tribune() {
    return this.tribuneNames[this.tribuneName];
  }
}
