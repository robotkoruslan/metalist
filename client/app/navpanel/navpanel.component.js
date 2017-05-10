import template from './navpanel.html';

class NavpanelController {
  constructor($stateParams, $state) {
    'ngInject';
    this.$state = $state;
    this.currentState = $state.current.name;
    this.stateParams = $stateParams;
  }

  goTo(route) {
    if (this.stateParams.id && route == 'main.match') {
      this.$state.go('main.match', {id: this.stateParams.id});
    }
  }

  getClass(navName) {
    if (this.isCheckoutPage()) {
      return 'crm';
    }
    if (navName == 'match' && this.stateParams.id) {
      return 'crm';
    }
    if (navName == 'sector' && this.stateParams.sector) {
      return 'crm';
    }
    return 'crmdis';
  }

  isCheckoutPage() {
    return this.currentState == 'main.checkout';
  }
}

let navpanelComponent = {
  templateUrl: template,
  controller: NavpanelController
};

export default navpanelComponent;