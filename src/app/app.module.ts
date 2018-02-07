import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { ROUTES } from './app.routes';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { AuthService } from './auth/auth.service';
import { TimesheetsService } from './services/timesheets.service';
import { InstantSearchService } from './services/instantsearch.service';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthGuardService } from './auth/auth-guard.service';
import { ScopeGuardService } from './auth/scope-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { CallbackComponent } from './callback/callback.component';
import { TimesheetListComponent } from './timesheet-list/timesheet-list.component';
import { TimesheetAddComponent } from './timesheet-add/timesheet-add.component';
import { ApprovalComponent } from './approval/approval.component';
import { HitsComponent } from './hits/hits.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { RefinementListComponent } from './refinement-list/refinement-list.component';
import { SearchComponent } from './search/search.component';
import { NewSearchBoxComponent } from './new-search-box/new-search-box.component';
import { ProductComponent } from './product/product.component';
import { ProductNavBarComponent } from './product-nav-bar/product-nav-bar.component';
import { SearchNavBarComponent } from './search-nav-bar/search-nav-bar.component';
import { NavbarDefaultComponent } from './navbar-default/navbar-default.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token')),
    globalHeaders: [{'Content-Type': 'application/json'}],
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    CallbackComponent,
    TimesheetListComponent,
    TimesheetAddComponent,
    ApprovalComponent,
    HitsComponent,
    SearchBoxComponent,
    RefinementListComponent,
    SearchComponent,
    NewSearchBoxComponent,
    ProductComponent,
    ProductNavBarComponent,
    SearchNavBarComponent,
    NavbarDefaultComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    MatButtonModule,
    MatMenuModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    ScopeGuardService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    TimesheetsService,
    InstantSearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
