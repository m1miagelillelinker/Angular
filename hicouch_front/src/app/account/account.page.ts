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
  activitiesSelected = true;
  friendsSelected = false;
  badgesSelected = false;
  profileProgress = {
    fullProgress: '150px', //'150px',
    userProgress: '120px' // user.score * 150 / 100
  }
  table = {
    columns: ['Utilisateur', 'Activité', 'Détails de l\'activité', 'Date'],
    rows: this.getActivities()
  }

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

  toggleFeature(event: string) {
    switch (event) {
      case 'activities':
        this.activitiesSelected = true;
        this.friendsSelected = false;
        this.badgesSelected = false;
        break;
      case 'friends':
        this.activitiesSelected = false;
        this.friendsSelected = true;
        this.badgesSelected = false;
        break;
      case 'badges':
        this.activitiesSelected = false;
        this.friendsSelected = false;
        this.badgesSelected = true;
        break;
    }
  }

  getBadges() {
    return [
      [ 'badgerow1col1', 'badgerow1col2', 'badgerow1col3', 'badgerow1col4' ],
      [ 'badgerow2col1', 'badgerow2col2', 'badgerow2col3', 'badgerow2col4' ],
      [ 'badgerow3col1', 'badgerow3col2', 'badgerow3col3', 'badgerow3col4' ],
      [ 'badgerow4col1', 'badgerow4col2', 'badgerow4col3', 'badgerow4col4' ]
    ];
  }

  getFriends() {
    return [
      [ 'friendrow1col1', 'friendrow1col2', 'friendrow1col3', 'friendrow1col4' ],
      [ 'friendrow2col1', 'friendrow2col2', 'friendrow2col3', 'friendrow2col4' ],
      [ 'friendrow3col1', 'friendrow3col2', 'friendrow3col3', 'friendrow3col4' ],
      [ 'friendrow4col1', 'friendrow4col2', 'friendrow4col3', 'friendrow4col4' ]
    ];
  }

  getActivities() {
    return [
      [ 'activityrow1col1', 'activityrow1col2', 'activityrow1col3', 'activityrow1col4' ],
      [ 'activityrow2col1', 'activityrow2col2', 'activityrow2col3', 'activityrow2col4' ],
      [ 'activityrow3col1', 'activityrow3col2', 'activityrow3col3', 'activityrow3col4' ],
      [ 'activityrow4col1', 'activityrow4col2', 'activityrow4col3', 'activityrow4col4' ]
    ];
  }

  showBadges() {
    this.toggleFeature('badges');
    this.table.rows = this.getBadges();
  }

  showFriends() {
    this.toggleFeature('friends');
    this.table.rows = this.getFriends();
  }

  showActivities() {
    this.toggleFeature('activities');
    this.table.rows = this.getActivities();
  }
}
