import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { CashboxComponent } from './cashbox/cashbox.component';
import { LastTicketsComponent } from './cashbox/last-tickets/last-tickets.component';
import { DaysStatisticComponent } from './cashbox/days-statistic/days-statistic.component';
import { AbonementTicketComponent } from './cashbox/abonement-ticket/abonement-ticket.component';
import { TicketsStatisticComponent } from './admin/tickets-statistic/tickets-statistic.component';
import { MatchEditorComponent } from './admin/match-editor/match-editor.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { SeasonTicketComponent } from './admin/season-ticket/season-ticket.component';
import { PriceSchemaComponent } from './admin/price-schema/price-schema.component';
import { OrderDetailsComponent } from './admin/order-details/order-details.component';

// import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'admin',  component: AdminComponent,
    children: [
      {path: 'ticketsStatistic', component: TicketsStatisticComponent},
      {path: 'matchEditor', component: MatchEditorComponent},
      {path: 'adminUsers', component: AdminUsersComponent},
      {path: 'seasonTicket', component: SeasonTicketComponent},
      {path: 'priceSchema', component: PriceSchemaComponent},
      {path: 'orderDetails', component: OrderDetailsComponent}
    ]},
  { path: 'cashbox',  component: CashboxComponent ,
    children: [
    {path: 'daysStatistic', component: DaysStatisticComponent},
    {path: 'lastTickets', component: LastTicketsComponent},
    {path: 'abonementTicket', component: AbonementTicketComponent}
  ] },
];
