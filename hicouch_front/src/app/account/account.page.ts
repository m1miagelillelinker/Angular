import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { Movie, Book } from '../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-account-page',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPageComponent implements OnInit {
  user: User;
  activitySelected = true;
  friendsSelected = false;
  badgesSelected = false;
  sub = true;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // tt3896198
    const userId = this.route.snapshot.paramMap.get('userId');
    this.userService.getUser(0).subscribe((user) => {
      const myUser = {
        id: user.id,
        pseudo: user.pseudo,
        score: user.score,
        firstName: user.firstName,
        lastName: user.lastName,
        idToken: '',
        accessToken: '',
        expiresAt: 0,
      };
      this.user = myUser;
    });
  }

  toggleFeature(event: string) {
    switch (event) {
      case 'activity':
        this.activitySelected = true;
        this.friendsSelected = false;
        this.badgesSelected = false;
        break;
      case 'friends':
        this.activitySelected = false;
        this.friendsSelected = true;
        this.badgesSelected = false;
        break;
      case 'badges':
        this.activitySelected = false;
        this.friendsSelected = false;
        this.badgesSelected = true;
        break;
    }
  }

  doSthg() {
    this.sub = !this.sub;
  }

}
