import { Component, OnInit, EventEmitter } from '@angular/core';
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

  tabHasBeenSelected = new EventEmitter();
  constructor(
      private router: Router,
  ) { }

  ngOnInit() {
  }

  /**
   * Display the tab corresponding to the name in parameter
   *
   * @param tab
   */
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
    this.tabHasBeenSelected.emit(tab);

  }

}
