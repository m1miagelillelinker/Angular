import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { Movie, Book } from '../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';
import { BadgesService } from '../shared/services/badges.service';




@Component({
  selector: 'app-account-page',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPageComponent implements OnInit {
  user: User;
  activitiesSelected: boolean = true;
  friendsSelected: boolean = false;
  badgesSelected: boolean = false;

  profileProgress = {
    fullProgress: '180px', //'150px',
    userProgress: '100px', // user.score * 170 / 100
  }

  tableActivites = {
    columns: ['Utilisateur', 'Activité', 'Détails de l\'activité', 'Date'],
    rows: this.getActivities()
  }

  followersUsers: User[];
  followsUsers: User[];


  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private BadgesService:BadgesService
  ) { }

  ngOnInit() {
    // tt3896198
    const userId = this.route.snapshot.paramMap.get('userId');
    const parsedUserId = parseInt(userId, 10);
    this.userService.getUser(parsedUserId).subscribe((user) => {
      this.user = {
        id: user.id,
        pseudo: user.pseudo,
        score: user.score,
        firstName: user.firstName,
        lastName: user.lastName,
        picture: user.picture,
        idToken: '',
        accessToken: '',
        expiresAt: 0,
        badges:user.badges
      };
    });
    this.userService.getFollowers(parsedUserId).subscribe((json: User[]) => this.followersUsers = json);
    this.userService.getFollows(parsedUserId).subscribe((json: User[]) => this.followsUsers = json);
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

  loadMoviePage() {
    // TODO (elise) when search done
  }


  getActivities() {
    return [
      [ 'Elise', 'a créé une nouvelle association', 'a créé un tag personnageFéminin', '06/juin/2019'],
      [ 'Mathieu', 'a créé une nouvelle association', 'a créé un tag BestMovies', '06/juillet/2019' ],
      [ 'Anass', 'a modifié une nouvelle association', 'a créé un tag MarvelMovies', '06/juillet/2019' ],
      [ 'Edouard', 'a créé une nouvelle association', 'a créé un tag DCMovies', '06/Août/2019' ]
    ];
  }

  showBadges() {
    this.toggleFeature('badges');
  }

  showActivities() {
    this.toggleFeature('activities');
    this.tableActivites.rows = this.getActivities();
  }

  showFriends() {
    this.toggleFeature('friends');
  }
}
