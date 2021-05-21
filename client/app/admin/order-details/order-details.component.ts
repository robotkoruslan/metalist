import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import {Order} from '../../model/order.interface';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {

  order: Order;
  ticket: Order;
  privateId: string;
  accessCode: string;
  messageOrder: string;
  messageTicket: string;
  message: string;

  constructor(private cartService: CartService) { }

  getOrder() {
    this.order = null;
    this.messageOrder = '';
    this.cartService.getOrderByPrivateId(this.privateId)
      .subscribe(
        response => this.order = response,
        err => this.messageOrder = 'getOrderFail',
      )
  }
  getTicket() {
    this.ticket = null;
    this.messageTicket = '';
    this.cartService.getTicketByaAcessCode(this.accessCode)
      .subscribe(
        response => this.ticket = response,
        err => this.messageTicket = 'getTicketFail',
      )
  }

}
