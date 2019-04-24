import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { Movie, Book } from '../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPageComponent implements OnInit {
  user: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // tt3896198
    const userId = this.route.snapshot.paramMap.get('userId');
    this.userService.getUser(userId).subscribe((user) => {
      const myUser = {
        id: user.id,
        pseudo: user.pseudo,
        score: user.score,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      this.user = myUser;
    });
  }



}
