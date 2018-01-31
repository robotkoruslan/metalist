import {Component, Input, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  @Input() isHeader: boolean;
  cart: any;

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.getCart();
  }

  getCart = () => this.cartService.getCart()
    .subscribe(
      result => this.cart = result
    )

  getPrice() {
    const seats = this.getSeats();
    if (seats) {
      return seats.reduce((price, seat) => {
        return price + seat.price;
      }, 0);
    } else {
      return 0;
    }
  }

  getSize = () => this.cartService.getMyCartSize();

  getSeats = () => this.cartService.getMyCart().seats;

}
