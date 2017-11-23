import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navpanel',
  templateUrl: './navpanel.component.html',
  styleUrls: ['./navpanel.component.css']
})
export class NavpanelComponent implements OnInit {

  stateParams: any;
  currentState: any;

  constructor() { }

  ngOnInit() {
  }

  // goTo(route) {
  //   if (this.stateParams.id && route == 'main.match') {
  //     this.$state.go('main.match', {id: this.stateParams.id});
  //   }
  // }

  // getClass(navName) {
  //   if (this.isCheckoutPage()) {
  //     return 'crm';
  //   }
  //   if (navName === 'match' && this.stateParams.id) {
  //     return 'crm';
  //   }
  //   if (navName === 'sector' && this.stateParams.sector) {
  //     return 'crm';
  //   }
  //   return 'crmdis';
  // }
  //
  // isCheckoutPage() {
  //   return this.currentState === 'main.checkout';
  // }

}
