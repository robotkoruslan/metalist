import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LastTicketsComponent } from './last-tickets/last-tickets.component';
import { DaysStatisticComponent } from './days-statistic/days-statistic.component';
import { AbonementTicketComponent } from './abonement-ticket/abonement-ticket.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LastTicketsComponent, DaysStatisticComponent, AbonementTicketComponent]
})
export class CashboxModule { }
