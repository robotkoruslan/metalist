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
  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

  getPrice() {
    if (this.isCartLoaded()) {
      return this.cart.seats.reduce((price, seat) => {
        return price + seat.price;
      }, 0);
    }
  }

  getSize() {
    return this.cartService.getMyCartSize();
  }

  isCartLoaded() {
    this.cart = this.cartService.getMyCart();
    return this.cart.seats;
  }

}
