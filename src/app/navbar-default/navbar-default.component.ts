import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar-default',
  templateUrl: './navbar-default.component.html',
  styleUrls: ['./navbar-default.component.css']
})
export class NavbarDefaultComponent {

  constructor(public auth: AuthService) {

  }
}
