import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { AUTH_CONFIG } from '../auth/auth0-variables';
import 'rxjs/add/operator/map';
import { NewTimesheetModel } from '../models/new-timesheet-model';

@Injectable()
export class TimesheetsService {

  constructor(public authHttp: AuthHttp) { }

  /*
    Restes du Timesheets example
  */
  addTimesheet(model: NewTimesheetModel) {
    return this.authHttp.post(AUTH_CONFIG.apiUrl + '/timesheets', JSON.stringify(model));
  }

  getAllTimesheets() {
    return this.authHttp.get(AUTH_CONFIG.apiUrl + '/timesheets')
      .map(res => res.json())
  }

  getUnapprovedTimesheets() {
    return this.authHttp.get(AUTH_CONFIG.apiUrl + '/approvals')
      .map(res => res.json())
  }

  approveTimesheet(id: number) {
    return this.authHttp.put(AUTH_CONFIG.apiUrl + '/approvals/' + id, {})
  }

  /*
    Ping
  */
  ping() {
    return this.authHttp.get(AUTH_CONFIG.apiUrl + '/ping')
      .map(res => res.json())
  }

  securedPing() {
    return this.authHttp.get(AUTH_CONFIG.apiUrl + '/secured/ping')
      .map(res => res.json())
  }

}
