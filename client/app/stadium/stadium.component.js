import template from './stadium.html';
import StadiumController from './stadium.controller'



let stadiumComponent = {
  templateUrl: template,
  controller: StadiumController,
  bindings: {
    priceSchema: '<',
    //onSectorSelect: '&',
    onSectorSelect: '&'
  }
};

export default stadiumComponent;