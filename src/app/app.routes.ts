import { Routes, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { CallbackComponent } from './callback/callback.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { ScopeGuardService as ScopeGuard } from './auth/scope-guard.service';
import { TimesheetListComponent } from './timesheet-list/timesheet-list.component';
import { TimesheetAddComponent } from './timesheet-add/timesheet-add.component';
import { ApprovalComponent } from './approval/approval.component';

import { SearchComponent } from './search/search.component';
import { ProductComponent } from './product/product.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'callback', component: CallbackComponent },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  // { path: 'company/:startup_slug', component: ProductComponent },
  { path: 'product/:product_slug', component: ProductComponent },
  { path: 'timesheets/add', component: TimesheetAddComponent, canActivate: [AuthGuard] },
  { path: 'timesheets', component: TimesheetListComponent, canActivate: [AuthGuard] },
  { path: 'approval', component: ApprovalComponent, canActivate: [ScopeGuard], data: { expectedScopes: ['approve:timesheets']} },
  { path: '**', redirectTo: '' }
];


