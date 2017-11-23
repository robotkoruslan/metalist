import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order: any;
  privateId: string;
  message: string;

  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

  getOrder() {
    this.order = {};
    this.message = '';
    // this.order = this.cartService.getOrderByPrivateId(this.privateId);
    console.log('this.order', this.order);
  }

}
