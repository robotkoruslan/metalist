import { Component, Input } from '@angular/core';

@Component({
  selector: 'logo-circle',
  template: `
    <div class="circle" [ngStyle]="styles"></div>`,
  styleUrls: ['./logo-circle.component.less']
})

export class LogoCircleComponent {
  @Input() diameter: number;
  @Input() right: boolean;
  @Input() image: string;
  get styles() {
    const style = this.image ? {backgroundImage:  `url(${this.image})`} : {};
    return {
      // height: this.diameter + 'px',
      // width: this.diameter + 'px',
      [`margin${this.right ? 'Right' : 'Left'}`]: -(this.diameter / 2) + 'px',
      [this.right ? 'right' : 'left']: 0,
      ...style
    };
  }
}
