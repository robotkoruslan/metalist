import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PriceSchemaService } from '../../services/price-schema.service';
import { CartService } from '../../services/cart.service';
import { MatchService } from '../../services/match.service';
import { AppConstant } from '../../app.constant';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.less']
})
export class SectorComponent implements OnInit {

  match: any = {};
  sector: any;
  // hasRoleCashier = Auth.hasRole('cashier');
  // printTickets: any = [];
  tickets: any = [];
  reservedSeats: any = [];
  selectedSeats: any = [];
  priceSchema: any = {};
  // tribuneName: any = $stateParams.tribune;
  sectorPrice: string = '';
  rowRow: string = 'Ряд';
  message: string = '';
  matchId: string;
  sectorId: string;
  tribuneName: string;
  slug: string;
  isReserveSuccess: boolean;
  // firstUpperRow = this.getFirstUpperRow($stateParams.sector);

  constructor(private priceSchemaService: PriceSchemaService, private cartService: CartService,
              private route: ActivatedRoute, private matchService: MatchService) {
    this.route.params.subscribe(params => console.log('SectorComponent 0 ', params.matchId));
    this.route.params.subscribe(params => this.matchId = params.matchId);
    this.route.params.subscribe(params => this.sectorId = params.sectorId);
    this.route.params.subscribe(params => this.tribuneName = params.tribuneId);
    // this.route.params.pluck('matchId').subscribe(matchId => console.log('MatchComponent 1 ',matchId));

    // this.sector = {
    //   name: '1',
    //   rows: [
    //     {
    //       name: '1',
    //       seats: '17'
    //     },
    //     {
    //       name: '2',
    //       seats: '17'
    //     },
    //     {
    //       name: '3',
    //       seats: '17'
    //     },
    //     {
    //       name: '4',
    //       seats: '17',
    //
    //     },
    //     {
    //       name: '5',
    //       seats: '17'
    //     },
    //     {
    //       name: '6',
    //       seats: '17'
    //     },
    //     {
    //       name: '7',
    //       seats: '13'
    //     },
    //     {
    //       name: '8',
    //       seats: '13'
    //     },
    //     {
    //       name: '9',
    //       seats: '13'
    //     },
    //     {
    //       name: '10',
    //       seats: '13'
    //     },
    //     {
    //       name: '11',
    //       seats: '13'
    //     },
    //     {
    //       name: '12',
    //       seats: '13'
    //     },
    //     {
    //       name: '13',
    //       seats: '13'
    //     },
    //     {
    //       name: '14',
    //       seats: '13'
    //     },
    //     {
    //       name: '15',
    //       seats: '13'
    //     },
    //     {
    //       name: '16',
    //       seats: '13'
    //     },
    //     {
    //       name: '17',
    //       seats: '13'
    //     },
    //     {
    //       name: '18',
    //       seats: '13'
    //     },
    //     {
    //       name: '19',
    //       seats: '5'
    //     },
    //     {
    //       name: '20',
    //       seats: '6'
    //     },
    //     {
    //       name: '21',
    //       seats: '6'
    //     },
    //     {
    //       name: '22',
    //       seats: '6'
    //     },
    //     {
    //       name: '23',
    //       seats: '6'
    //     },
    //     {
    //       name: '24',
    //       seats: '6'
    //     },
    //     {
    //       name: '25',
    //       seats: '19'
    //     },
    //     {
    //       name: '26',
    //       seats: '19'
    //     },
    //     {
    //       name: '27',
    //       seats: '19'
    //     },
    //     {
    //       name: '28',
    //       seats: '19'
    //     },
    //     {
    //       name: '29',
    //       seats: '19'
    //     },
    //     {
    //       name: '30',
    //       seats: '19'
    //     },
    //     {
    //       name: '31',
    //       seats: '19'
    //     },
    //     {
    //       name: '32',
    //       seats: '19'
    //     },
    //     {
    //       name: '33',
    //       seats: '19'
    //     },
    //     {
    //       name: '34',
    //       seats: '19'
    //     },
    //     {
    //       name: '35',
    //       seats: '19'
    //     },
    //     {
    //       name: '36',
    //       seats: '19'
    //     },
    //     {
    //       name: '37',
    //       seats: '19'
    //     },
    //     {
    //       name: '38',
    //       seats: '19'
    //     },
    //     {
    //       name: '39',
    //       seats: '19'
    //     },
    //     {
    //       name: '40',
    //       seats: '16'
    //     },
    //     {
    //       name: '41',
    //       seats: '20'
    //     }
    //   ]
    //
    //
    //   //   if (match.priceSchema.priceSchema.stadiumName == 'dinamo') {
    //   //   this.sector = AppConstant.StadiumDinamo['tribune_' + sector.tribune]['sector_' + sector.sector];
    //   // } else {
    //   //   if (match.priceSchema.priceSchema.stadiumName == 'solar') {
    //   //     this.sector = AppConstant.StadiumSolar['tribune_' + sector.tribune]['sector_' + sector.sector];
    //   //   } else {
    //   //     this.sector = AppConstant.StadiumMetalist['tribune_' + sector.tribune]['sector_' + sector.sector];
    //   //   }
    //   // }
    // };
    this.sector = {
      name: '3',
      rows: [
      ]


      //   if (match.priceSchema.priceSchema.stadiumName == 'dinamo') {
      //   this.sector = AppConstant.StadiumDinamo['tribune_' + sector.tribune]['sector_' + sector.sector];
      // } else {
      //   if (match.priceSchema.priceSchema.stadiumName == 'solar') {
      //     this.sector = AppConstant.StadiumSolar['tribune_' + sector.tribune]['sector_' + sector.sector];
      //   } else {
      //     this.sector = AppConstant.StadiumMetalist['tribune_' + sector.tribune]['sector_' + sector.sector];
      //   }
      // }
    };
  }

  ngOnInit() {
    this.getPrice();
    // this.getReservedSeats();
    // this.getSelectedSeats();
  }

  getPrice() {
    this.matchService.fetchMatch(this.matchId)
      .subscribe((res) => {
      this.match = res;
      this.priceSchema = this.match.priceSchema.priceSchema;
      this.sectorPrice = this.priceSchemaService.getPriceBySector(this.tribuneName, this.sector.name, this.priceSchema);

          if (this.match.priceSchema.priceSchema.stadiumName === 'dinamo') {
          this.sector = AppConstant.StadiumDinamo['tribune_' + this.tribuneName]['sector_' + this.sectorId];
        } else {
          if (this.match.priceSchema.priceSchema.stadiumName === 'solar') {
            this.sector = AppConstant.StadiumSolar['tribune_' + this.tribuneName]['sector_' + this.sectorId];
          } else {
            this.sector = AppConstant.StadiumMetalist['tribune_' + this.tribuneName]['sector_' + this.sectorId];
          }
        }
      });

  }

  // getReservedSeats() {
  //   let matchId = this.match.id,
  //     sectorName = this.sector.name;
  //
  //   return this.ticketsService.fetchReservedSeats(matchId, sectorName)
  //     .then( seats => this.reservedSeats = seats );
  // }

  // getSelectedSeats() {
  //   this.selectedSeats = this.cartService.getMyCart().seats.map(seat => {
  //     return {
  //       slug: seat.slug,
  //       matchId: seat.match.id
  //     };
  //   });
  // }
// @TODO need verification
//   updateReservedTickets() {
//     // this.getReservedSeats();
//     this.getSelectedSeats();
//   }

  addClassByCheckSoldSeat(slug) {
    const [ checkSeat ] = this.selectedSeats.filter(seat => seat.slug === slug && seat.matchId === this.match.id);

    if (this.reservedSeats.includes(slug) && checkSeat) {
      return 'blockedSeat';
    }

    if ( this.reservedSeats.includes(slug) && !checkSeat ) {
      return 'soldSeat';
    }

    return 'imgSeatsStyle';
  }

  addSeatToCart(sectorName, rowName, seat) {
    console.log('addSeatToCart ', sectorName, rowName, seat);
    const slug = 's' + sectorName + 'r' + rowName + 'st' + seat,
      [ checkSeat ] = this.selectedSeats.filter(seat => seat.slug === slug && seat.matchId === this.match.id);
    this.message = '';
    this.isReserveSuccess = false;

    if ( checkSeat && this.reservedSeats.includes(slug) ) {
      this.cartService.removeSeatFromCart(slug, this.match.id);
        // .then(() => {
        //   this.getReservedSeats();
        //   this.getSelectedSeats();
        // });
    }
  //
  //   if( !this.reservedSeats.includes(slug) ) {
  //     this.cartService.addSeatToCart(slug, this.match.id)
  //       .then(() => {
  //         this.getReservedSeats();
  //         this.getSelectedSeats();
  //       })
  //       .catch((err) => {
  //         if (err.status === 409) {
  //           this.message = 'Это место уже занято.';
  //           this.getReservedSeats();
  //         }
  //       });
  //   }
  }

  getFirstUpperRow(sectorNumber) {
    const sectorDividers: any = {
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

  makeArrayFromNumber (number) {
    const seats = [];
    for (let i = 1; i <= number; i++) {
      seats.push(i);
    }
    return seats;
  }

  isSkybox() {
    const skyBoxes: any = ['SB_1', 'SB_2', 'SB_3_5', 'SB_6', 'SB_7', 'SB_8', 'SB_9', 'SB_10', 'SB_11' ];
    return skyBoxes.includes(this.sector.name);
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
