import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Seat} from '../../model/seat.interface';
import {CartService} from "../../services/cart.service";
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  @Input() seats: any;
  @Output() onDelete = new EventEmitter<any>();

  constructor(private cartService:CartService) {
  }

  ngOnInit() {
  }

  removeSeat(slug, matchId) {
    this.cartService.removeSeatFromCart(slug, matchId)
      .subscribe(
        () => this.onDelete.emit(),
        error => console.log(error));
  }
}
