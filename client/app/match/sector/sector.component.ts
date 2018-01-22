import {Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PriceSchemaService} from '../../services/price-schema.service';
import {CartService} from '../../services/cart.service';
import {MatchService} from '../../services/match.service';
import {AppConstant} from '../../app.constant';
import {TicketService} from "../../services/ticket.service";
import {Sector} from "../../model/sector.interface";
import {Seat} from "../../model/seat.interface";
import {PriceSchema} from "../../model/price-schema.interface";
import {Match} from "../../model/match.interface";

interface SelectedSeat {
  slug: string,
  matchId: string
}

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.less']
})

export class SectorComponent implements OnInit {

  match: Match;
  sector:Sector;
  seats:Seat[];
  // hasRoleCashier = Auth.hasRole('cashier');
  // printTickets: any = [];
  tickets:any = [];
  reservedSeats:Seat[] = [];
  selectedSeats:SelectedSeat[] = [];
  priceSchema:PriceSchema|{} = {};
  // tribuneName: any = $stateParams.tribune;
  sectorPrice:string = '';
  rowRow:string = 'Ряд';
  message:string = '';
  matchId:string;
  sectorId:string;
  tribuneName:string;
  slug:string;
  show = false;
  addresses = {
    solar: 'Стадион Солнечный. Пятихатки, Белгородское шоссе',
    dinamo: 'Стадион Динамо. Ул. Динамовская, 3, станция метро Научная',
    metalist: 'Стадион Металлист. Ул. Плехановская, 65, станция метро Спортивная / Метростроителей',
  };

  constructor(private priceSchemaService:PriceSchemaService, private cartService:CartService,
              private route:ActivatedRoute, private matchService:MatchService, private ticketsService:TicketService) {
    this.route.params.subscribe((params: any) => this.matchId = params.matchId);
    this.route.params.subscribe((params: any) => this.sectorId = params.sectorId);
    this.route.params.subscribe((params: any) => this.tribuneName = params.tribuneId);

  }

  ngOnInit() {
    this.getPrice();
    this.updateSeatsData();
  }

  updateSeatsData = () => {
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
        this.reservedSeats = seats
      });
  }

  getSelectedSeats = () =>
    this.cartService.getCart()
      .subscribe(
        cart => {
          this.seats = cart.seats;
          this.selectedSeats = this.seats.map(seat => {
            return {
              slug: seat.slug,
              matchId: seat.match.id
            };
          });
        },
        err => console.log(err)
      )

// @TODO need verification
  updateReservedTickets() {
    // this.getReservedSeats();
    this.getSelectedSeats();
  }

  addClassByCheckSoldSeat(slug) {
    const checkSeat = this.selectedSeats.find(seat => seat.slug === slug && seat.matchId === this.match.id);

    if (this.reservedSeats.includes(slug) && checkSeat) {
      return 'blockedSeat';
    }

    if (this.reservedSeats.includes(slug) && !checkSeat) {
      return 'soldSeat';
    }

    return 'imgSeatsStyle';
  }

  toggleSeat(slug) {
    const checkSeat = this.selectedSeats.find(seat => seat.slug === slug && seat.matchId === this.match.id);
    this.message = '';
    if (checkSeat && this.reservedSeats.includes(slug)) {
      this.cartService.removeSeatFromCart(slug, this.match.id)
        .subscribe(
          () => this.updateSeatsData(),
          error => console.log(error)
        );
    }

    if (!this.reservedSeats.includes(slug)) {
      this.cartService.addSeatToCart(slug, this.match.id)
        .subscribe(
          () => this.updateSeatsData(),
          error => {
            if (error.status === 409) {
              this.message = 'Это место уже занято.';
              this.getReservedSeats();
            }
          }
        );
    }
  }

  getFirstUpperRow(sectorNumber) {
    const sectorDividers:any = {
      "1": 19,
      "2": 20,
      "8": 20,
      "9": 19,
      "10": 15,
      "11": 15,
      "12": 15,
      "13": 15,
      "14": 15,
      "15": 15,
      "16": 15,
      "17": 15,
      "18": 15,
      "19": 15,
      "20": 15,
      "22": 9,
      "23": 9,
      "24": 9,
      "25": 9,
      "26": 9,
      "27": 9,
      "28": 9,
      "29": 9,
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

  // pay() {
  //   this.cartService.pay()
  //     .then((order) => {
  //       this.tickets = order.tickets;
  //       console.log('order', order);
  //       this.cartService.loadCart()
  //         .then(() => {
  //           this.printTickets = [];
  //           this.printTickets = angular.copy(this.tickets);
  //           this.updateReservedTickets();
  //         });
  //     })
  //     .catch((err) => {
  //       if (err.status === 406) {
  //         this.isReserveSuccess = true;
  //       } else {
  //         this.message = 'err';
  //       }
  //     });
  // }

  // ticketRendering(){
  //   this.printTicketService.print();
  // }

}
