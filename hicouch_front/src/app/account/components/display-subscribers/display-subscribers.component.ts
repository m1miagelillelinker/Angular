import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {User} from '../../../shared/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-subscribers',
  templateUrl: './display-subscribers.component.html',
  styleUrls: ['./display-subscribers.component.scss']
})
export class DisplaySubscribersComponent implements OnInit {

  @Input() title: String;
  @Input() currentUser;
  @Input() users: Array<User>;
  @Output() change = new EventEmitter();

  constructor(
    public router: Router,
  ) { }

  ngOnInit() {
    console.log(this.users);
  }

  goToUser(id) {
    this.change.emit(id);
    this.router.navigate(['app/account', id]);
  }

}
