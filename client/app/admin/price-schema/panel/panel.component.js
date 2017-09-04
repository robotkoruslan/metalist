import template from './panel.html';

class PanelController {
  constructor() {
    this.schemas = [];

    this.colors = [
      {color: '#8b54aa', colorName: 'violet'},
      {color: '#ffcc00', colorName: 'yellow'},
      {color: '#6f89c0', colorName: 'blue'},
      {color: '#54aa6a', colorName: 'green'},
      {color: '#ff972f', colorName: 'orange'}
    ];
  }

  $onChanges(changes) {
    if ( changes.currentPriceSchema ) {
      this.priceSchema = this.currentPriceSchema;
    }
  }

  colorDel(priceSchema) {
    console.log('11', priceSchema);
  }
  colorSave(currentPrice) {
    this.currentPrice = {};
    console.log('11', currentPrice);
  }

}

let panelComponent = {
  templateUrl: template,
  controller: PanelController,
  bindings: {
    currentPriceSchema: '<',
    onChange: '&'
  }
};

export default panelComponent;