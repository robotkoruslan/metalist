import { Component, Input } from '@angular/core';

@Component({
  selector: 'logo-circle',
  template: `<div [ngClass]="{'circle': true, 'classic': !dimension, 'small': dimension, 'right': right, 'left': !right}"
                  [style]="style"></div>`,
  styleUrls: ['./logo-circle.component.less']
})

export class LogoCircleComponent {
  @Input() dimension: number;
  @Input() right: boolean;
  @Input() image: string;

  get style() {
    return this.image && `backgroundImage: url(${this.image})`;
  }
}
