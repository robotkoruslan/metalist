import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketsStatisticComponent } from './tickets-statistic/tickets-statistic.component';
import { MatchEditorComponent } from './match-editor/match-editor.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { SeasonTicketComponent } from './season-ticket/season-ticket.component';
import { PriceSchemaComponent } from './price-schema/price-schema.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [TicketsStatisticComponent, MatchEditorComponent, AdminUsersComponent, SeasonTicketComponent,
    PriceSchemaComponent, OrderDetailsComponent]
})
export class AdminModule { }
