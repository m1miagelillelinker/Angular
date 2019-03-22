import { Component, OnInit, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: User;
  userSelected = new EventEmitter();
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    // TODO : DEMOCK ! 
    // this.userService.getUser(1).subscribe(
    //   (user: User) => {
    //     console.log(user);
    //     this.user = user;
    //     this.userSelected.emit(this.user);
    //   }
    // );

    this.user = {
      id: 1,
      firstName: 'Mocked',
      lastName: 'User'
    };
  }

}
