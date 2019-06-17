import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { Movie, Book } from '../shared/models/product';
import {ActivatedRoute, Router} from '@angular/router';
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
  activitiesSelected: boolean = true;
  friendsSelected: boolean = false;
  badgesSelected: boolean = false;

  profileProgress = {
    fullProgress: '150px', //'150px',
    userProgress: '100px', // user.score * 150 / 100
  }

  tableActivites = {
    columns: ['Utilisateur', 'Activité', 'Détails de l\'activité', 'Date'],
    rows: this.getActivities()
  }

  followersUsers: User[];
  followsUsers: User[];

  badges = [
    {intitule:"Youngling",libelle:"Vous avez fait 10 commentaires !",image:"../../assets/images/youngling.png",score:"80",enabled:2},
    {intitule:"Padawan",libelle:"Vous avez fait 100 commentaires !",image:"../../assets/images/padawan.png",score:"0",enabled:4},
    {intitule:"Knight",libelle:"Vous avez fait 500 commentaires !",image:"../../assets/images/knight.png",score:"0",enabled:4},
    {intitule:"Master",libelle:"Vous avez fait 1000 commentaires !",image:"../../assets/images/master.png",score:"0",enabled:4},
    {intitule:"Grand Master",libelle:"Vous avez fait plus de 1000 commentaires !",image:"../../assets/images/grandmaster.jpg",score:"0",enabled:4},
    {intitule:"Youngling",libelle:"Vous avez fait 10 Associations !",image:"../../assets/images/cup.jpg",score:"150",enabled:4},
    {intitule:"Padawan",libelle:"Vous avez fait 100 Associations !",image:"../../assets/images/cup.jpg",score:"100",enabled:4},
    {intitule:"Knight",libelle:"Vous avez fait 500 Associations !",image:"../../assets/images/cup.jpg",score:"0",enabled:4},
    {intitule:"Master",libelle:"Vous avez fait 1000 Associations !",image:"../../assets/images/cup.jpg",score:"0",enabled:4},
    {intitule:"Grand Master",libelle:"Vous avez fait plus de 1000 Associations !",image:"../../assets/images/cup.jpg",score:"0",enabled:4}
  ];
  //2 ok
  //4 hidden


  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    // tt3896198
    const userId = this.route.snapshot.paramMap.get('userId');
    const parsedUserId = parseInt(userId, 10);
    this.userService.getUser(parsedUserId).subscribe((user) => {
      const myUser = {
        id: user.id,
        pseudo: user.pseudo,
        score: user.score,
        firstName: user.firstName,
        lastName: user.lastName,
        picture: user.picture,
        idToken: '',
        accessToken: '',
        expiresAt: 0,
      };
      this.user = myUser;
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

  loadMoviePage(event) {
    console.log(event);
    // this.changeDetectorRef.detectChanges();
    event.id = event.id;
    this.router.navigate(['app/products/', event.id]);
  }
}
