import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-search-nav-bar',
  templateUrl: './search-nav-bar.component.html',
  styleUrls: ['./search-nav-bar.component.css']
})
export class SearchNavBarComponent {

  constructor(public auth: AuthService) {
  }
}
