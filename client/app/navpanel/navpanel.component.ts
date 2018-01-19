import {Component, Input} from '@angular/core';

@Component({
  selector: 'navpanel',
  template: `
    <div class="row cr">
      <div class="crumbs">
        <span *ngFor="let header of headers; let i = index" 
              [ngClass]="section >= i + 1 ? 'crm' : 'crmdis'">
          <a [title]="header">
            <span [ngClass]="{'bcTextInside4' : i === 3}">{{header}}</span>
          </a>
        </span>
      </div>
    </div>
  `,
  styleUrls: ['./navpanel.component.css']
})

export class NavpanelComponent {
 @Input() section: number;
  headers: string[] = ['Все матчи', 'Выбор сектора', 'Выбор места', 'Оформление заказа', 'Оплата'];
}
