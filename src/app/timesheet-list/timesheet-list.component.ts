import { Component, OnInit } from '@angular/core';
import { TimesheetsService } from '../services/timesheets.service';

@Component({
  selector: 'app-timesheet-list',
  templateUrl: './timesheet-list.component.html',
  styleUrls: ['./timesheet-list.component.css']
})
export class TimesheetListComponent implements OnInit {

  timesheets: any;
  error: string;

  constructor(private timesheetsService: TimesheetsService) { }

  ngOnInit() {
    this.timesheetsService.securedPing()
      .subscribe(
      data => this.timesheets = data,
      error => this.error = error.statusText
      );
  }

}
