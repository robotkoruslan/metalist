import { Component, Input } from '@angular/core';

@Component({
  selector: 'logo-circle',
  template: `<div class="circle" [ngStyle]="styles"></div>`,
  styleUrls: ['./logo-circle.component.less']
})

export class LogoCircleComponent {
  @Input() dimension: number;
  @Input() right: boolean;
  @Input() image: string;
  get styles() {
    const style = this.image ? {backgroundImage:  `url(${this.image})`} : {};
    const diameter = this.dimension * 0.8;
    return {
      // height: this.diameter + 'px',
      // width: this.diameter + 'px',
      [`margin${this.right ? 'Right' : 'Left'}`]: -(diameter / 2) + 'px',
      marginTop: this.dimension * 0.1 + 'px',
      [this.right ? 'right' : 'left']: 0,
      width: diameter + 'px',
      height: diameter + 'px',
      boxShadow: `0 0 0 ${this.dimension * 0.1}px #dedede`,
      ...style
    };
  }
}
