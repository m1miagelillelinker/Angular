import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../styles.scss'],
})
export class HomeComponent implements OnInit {
  title = 'hicouch';
  user: User;

  constructor() { }

  ngOnInit() {
  }

  loadUser(event: User) {
    this.user = event;
  }
}
