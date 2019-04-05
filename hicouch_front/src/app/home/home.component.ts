import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';
import { AuthenticationService } from '../services/login/authentification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title = "HiCouch";
  user: User;

  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
  }
}
