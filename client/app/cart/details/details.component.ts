import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CartService} from '../../services/cart.service';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  @Input() seats: any;
  @Output() onDelete = new EventEmitter<any>();

  constructor(private cartService: CartService) { }

  ngOnInit() {
    console.log('seats', this.seats);
  }

  removeSeat(slug, matchId) {
    this.cartService.removeSeatFromCart(slug, matchId)
      .subscribe(() => {
        this.onDelete.emit( { slug : slug, matchId : matchId });
      });
      // .then(() => {
      //   this.onDelete({$event: { slug: slug, matchId: matchId }});
      // });
  }

}
