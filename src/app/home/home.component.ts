import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { SearchBoxComponent } from '../search-box/search-box.component';
// import { HitsComponent } from '../hits/hits.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
