import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() user: User;
  userSelected = new EventEmitter();
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {

    // TODO : DEMOCK !
    // this.user = {
    //   id: 1,
    //   firstName: 'Mocked',
    //   lastName: 'User'
    // };
  }

}
