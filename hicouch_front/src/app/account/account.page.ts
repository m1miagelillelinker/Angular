import { Component, OnInit, Inject, Input, OnChanges } from '@angular/core';
import {ActivatedRoute, Router, Data } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { Badge } from '../shared/models/badge';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from '../shared/models/user';


export interface DialogData {
  pseudo: string;
}

@Component({
  selector: 'app-account-page',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPageComponent implements OnInit, OnChanges {
  user: User;
  currentUser: User;
  activitiesSelected = true;
  friendsSelected = false;
  badgesSelected = false;
  badges: Badge[];
  follows = false;
  otherUser = false;
  newUser: User;
  pseudo: string;

  profileProgress = {
    fullProgress: '180px',
    userProgress: '100px',
  };

  tableActivites = {
    columns: ['Utilisateur', 'Activité', 'Détails de l\'activité', 'Date'],
    rows: this.getActivities()
  };

  followersUsers: User[];
  followsUsers: User[];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit() {
    this.fetchUser();
  }

  ngOnChanges() {
    // this.user = null;
    this.showActivities();
    this.fetchUser();

  }

  fetchUser() {
    this.userService.getCurrentUser().subscribe(user => this.currentUser = user);
    const userId = this.route.snapshot.paramMap.get('userId');
    const parsedUserId = parseInt(userId, 10);
    this.userService.getUser(parsedUserId).subscribe((user) => {
      console.log(user);
      const myUser = {
        id: user.id,
        badges: user.badges,
        pseudo: user.pseudo,
        score: user.score,
        firstName: user.firstName,
        lastName: user.lastName,
        picture: user.picture,
        idToken: '',
        accessToken: '',
        expiresAt: 0
      };
      this.badges = user.badges;
      this.user = myUser;
      console.log(myUser);
      console.log(this.currentUser);
      console.log(this.user.id);
      this.userService.getHistoryById(user.id).subscribe(res => console.log(res));
      this.newUser = this.user;
      this.userService.getFollowers(parsedUserId).subscribe((json: User[]) => this.followersUsers = json);
      this.userService.getFollows(parsedUserId).subscribe((json: User[]) => this.followsUsers = json);
      this.otherUser = this.currentUser.id !== this.user.id;
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

  getActivities() {
    return [
      [ 'Elise', 'a créé une nouvelle association', 'a créé un tag personnageFéminin', '06/juin/2019'],
      [ 'Mathieu', 'a créé une nouvelle association', 'a créé un tag BestMovies', '06/juillet/2019' ],
      [ 'Anass', 'a modifié une nouvelle association', 'a créé un tag MarvelMovies', '06/juillet/2019' ],
      [ 'Edouard', 'a créé une nouvelle association', 'a créé un tag DCMovies', '06/Août/2019' ]
    ];
  }
  refresh(event) {
    this.userService.getCurrentUser().subscribe(user => this.currentUser = user);
    const parsedUserId = parseInt(event, 10);
    this.userService.getUser(parsedUserId).subscribe((user) => {
      console.log(user);
      const myUser = {
        id: user.id,
        badges: user.badges,
        pseudo: user.pseudo,
        score: user.score,
        firstName: user.firstName,
        lastName: user.lastName,
        picture: user.picture,
        idToken: '',
        accessToken: '',
        expiresAt: 0,
      };
      this.badges = user.badges;
      this.user = myUser;
      console.log(myUser);
      console.log(this.user.id);
      this.userService.getHistoryById(user.id).subscribe(res => console.log(res));
      this.userService.getFollowers(parsedUserId).subscribe((json: User[]) => this.followersUsers = json);
      this.userService.getFollows(parsedUserId).subscribe((json: User[]) => {
        this.followsUsers = json;
        this.follows = this.followsUsers.find(u => u.id === event) != null;
        console.log(this.currentUser.id);
        console.log(event);
        this.otherUser = this.currentUser.id !== event;
    });

    });
    this.showActivities();
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

  follow(id) {
    const userId = this.route.snapshot.paramMap.get('userId');
    const parsedUserId = parseInt(userId, 10);
    this.userService.follow(this.currentUser.id, parsedUserId).subscribe(res => console.log(res));
  }

  unFollow(id) {
    console.log(id);
    const userId = this.route.snapshot.paramMap.get('userId');
    const parsedUserId = parseInt(userId, 10);
    this.userService.unFollow(this.currentUser.id, parsedUserId).subscribe(res => console.log(res));
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogEditProfilComponent, {
      // width: '300px',
      data: {pseudo: this.pseudo}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.pseudo = result;
      if (this.pseudo != null) {
        console.log('edit pseudo');
          this.user.pseudo = this.pseudo;
          console.log(this.user.id);
          this.userService.editUserPseudo(this.user).subscribe((json: any) => this.user = json);
      }
    });
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-edit-profil',
  templateUrl: 'dialog-edit-profil.html',
})
export class DialogEditProfilComponent {
  selectedFile: boolean;
  processFile: boolean;
  constructor(
    public dialogRef: MatDialogRef<DialogEditProfilComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}


  onNoClick(): void {
    this.dialogRef.close();
  }

}


