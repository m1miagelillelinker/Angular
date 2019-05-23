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
  activitiesSelected:boolean = true;
  friendsSelected:boolean = false;
  badgesSelected:boolean = false;
  
  profileProgress = {
    fullProgress: '150px', //'150px',
    userProgress: '100px' // user.score * 150 / 100
  }

  tableActivites = {
    columns: ['Utilisateur', 'Activité', 'Détails de l\'activité', 'Date'],
    rows: this.getActivities()
  }

  subscribedUsers = [
    {lastname:"Avatar",firstname:"Avatar",image:"../../assets/images/profil.png"},
    {lastname:"Bond",firstname:"James",image:"../../assets/images/james.jpg"},
    {lastname:"DJ",firstname:"Robert",image:"../../assets/images/robert_DJ.jpg"}
  ];
   
  tableBadges = {
    columns: ['Utilisateur', 'Badges', 'Label'],
    rows: this.getBadges()
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
      [ 'badgerow1col1', 'badgerow1col2', 'badgerow1col3'],
      [ 'badgerow2col1', 'badgerow2col2', 'badgerow2col3'],
      [ 'badgerow3col1', 'badgerow3col2', 'badgerow3col3'],
      [ 'badgerow4col1', 'badgerow4col2', 'badgerow4col3']
    ];
  }


  getActivities() {
    return [
      [ 'Elise', 'a créé une nouvelle association', 'a créé un tag personnageFéminin', '06/juin/2019'],
      [ 'activityrow2col1', 'activityrow2col2', 'activityrow2col3', 'activityrow2col4' ],
      [ 'activityrow3col1', 'activityrow3col2', 'activityrow3col3', 'activityrow3col4' ],
      [ 'activityrow4col1', 'activityrow4col2', 'activityrow4col3', 'activityrow4col4' ]
    ];
  }

  showBadges() {
    this.toggleFeature('badges');
    this.tableBadges.rows = this.getBadges();
  }

  showActivities() {
    this.toggleFeature('activities');
    this.tableActivites.rows = this.getActivities();
  }

  showFriends() {
    this.toggleFeature('friends');
  }
}
