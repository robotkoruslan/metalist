import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'angular2-cookie';
import { RouterModule, PreloadAllModules} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgForm, Validators} from '@angular/forms';
// import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
// import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule, MatInputModule, MatCheckboxModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ROUTES } from './app.routes';
import { SharedModule } from './shared/shared.module';
import { CashboxModule } from './cashbox/cashbox.module';
import { AdminModule } from './admin/admin.module';

import { AuthGuard } from './auht/auth.guard';
import { RoleGuard } from './auht/role.guard';
import { AdminGuard } from './auht/admin.guard';
import { CartGuard } from './auht/cart.guard';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { TicketsComponent } from './tickets/tickets.component';
import { CashboxComponent } from './cashbox/cashbox.component';
import { FooterComponent } from './footer/footer.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MatchComponent } from './match/match.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuhtComponent } from './auht/auht.component';
import { LoginComponent } from './auht/login/login.component';
import { RegisterComponent } from './auht/register/register.component';
import { RecoveryComponent } from './auht/recovery/recovery.component';
import { SettingComponent } from './auht/setting/setting.component';
import { MatchDetailsComponent } from './match/match-details/match-details.component';
import { NavpanelComponent } from './match/navpanel/navpanel.component';
import { SectorComponent } from './match/sector/sector.component';
import { SelectSectorComponent } from './match/select-sector/select-sector.component';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { UtilService } from './services/util.service';
import { CashboxService } from './cashbox/cashbox.service';
import { TicketService } from './services/ticket.service';
import { PrintTicketService } from './services/print-ticket.service';
import { CartService } from './services/cart.service';
import { SeasonTicketService } from './services/season-ticket.service';
import { FileService } from './services/file.service';
import { PriceSchemaService } from './services/price-schema.service';
import { MatchEditorService } from './services/match-editor.service';
import { MatchService } from './services/match.service';
import { SummaryComponent } from './cart/summary/summary.component';
import { DetailsComponent } from './cart/details/details.component';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    TicketsComponent,
    CashboxComponent,
    FooterComponent,
    CheckoutComponent,
    NavbarComponent,
    AuhtComponent,
    LoginComponent,
    RegisterComponent,
    RecoveryComponent,
    SettingComponent,
    MatchComponent,
    MatchDetailsComponent,
    NavpanelComponent,
    SectorComponent,
    SelectSectorComponent,
    SummaryComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    // FormGroupDirective,
    // ErrorStateMatcher,
    // NgForm,
    // Validators,
    // RouterModule.forRoot(ROUTES, {enableTracing: true})
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),
    SharedModule,
    CashboxModule,
    AdminModule
  ],
  providers: [AuthGuard,
    CookieService,
    AuthService,
    UserService,
    UtilService,
    CashboxService,
    TicketService,
    PrintTicketService,
    CartService,
    RoleGuard,
    AdminGuard,
    CartGuard,
    SeasonTicketService,
    FileService,
    PriceSchemaService,
    MatchEditorService,
    MatchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
