import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CookieService } from 'angular2-cookie';
import { RouterModule, PreloadAllModules} from '@angular/router';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { TicketsComponent } from './tickets/tickets.component';
import { CashboxComponent } from './cashbox/cashbox.component';
import { FooterComponent } from './footer/footer.component';
import { CheckoutComponent } from './checkout/checkout.component';

import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { UtilService } from './services/util.service';

import { ROUTES } from './app.routes';
import { CashboxService } from './cashbox/cashbox.service';
import { CashboxModule } from './cashbox/cashbox.module';
import { AdminModule } from './admin/admin.module';
import { TicketService } from './services/ticket.service';
import { PrintTicketService } from './services/print-ticket.service';
import { CartService } from './services/cart.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    TicketsComponent,
    CashboxComponent,
    FooterComponent,
    CheckoutComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // RouterModule.forRoot(ROUTES, {enableTracing: true})
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),
    CashboxModule,
    AdminModule
  ],
  providers: [CookieService, AuthService, UserService, UtilService, CashboxService, TicketService, PrintTicketService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
