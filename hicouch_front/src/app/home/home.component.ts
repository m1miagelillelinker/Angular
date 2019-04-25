import { Component, OnInit, Input } from '@angular/core';
import { User } from '../shared/models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @Input() user: User;

  constructor(
    private router: Router,
    public auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.router.navigate(['app/products/', 'tt0120737']);
  }

  goToProducts() {
    this.router.navigate(['app/products']);
  }


}
