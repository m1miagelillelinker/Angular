import { Component, OnInit, Input } from '@angular/core';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';
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
    private userService: UserService,
    private router: Router,
    public auth: AuthenticationService
  ) { }

  ngOnInit() {
  }

  goToProducts() {
    this.router.navigate(['app/products']);
  }


}
