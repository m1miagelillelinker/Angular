import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-side-menu',
  templateUrl: './account-side-menu.component.html',
  styleUrls: ['./account-side-menu.component.scss'],
})
export class AccountSideMenuComponent implements OnInit {

  activitySelected = true;
  friendsSelected = false;
  badgesSelected = false;
  constructor(
      private router: Router,
  ) { }

  ngOnInit() {
  }

  selectTab(tab: string): void {
    switch (tab) {
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

}
