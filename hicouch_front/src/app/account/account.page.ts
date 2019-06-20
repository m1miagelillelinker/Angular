import { Component,Inject, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';
import { BadgesService } from '../shared/services/badges.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface DialogData {
  pseudo: string;
}

@Component({
  selector: 'app-account-page',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})



export class AccountPageComponent implements OnInit {
  user: User;
  newUser: User;
  activitiesSelected: boolean = true;
  friendsSelected: boolean = false;
  badgesSelected: boolean = false;
  pseudo:string;

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
    private BadgesService:BadgesService,
    public dialog: MatDialog
  ) {}

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
    this.newUser=this.user;
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

//button edit profil

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogEditProfil, {
      width: '300px',
      data: {pseudo: this.pseudo}
    });
    

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.pseudo = result;
      if(this.pseudo!=null){
        console.log('edit pseudo');
          this.user.pseudo=this.pseudo;
          console.log(this.user.id);
          this.userService.editUserPseudo(this.user).subscribe((json: any) => this.user = json);
      }
    });
  }
  
}
//Edit profil pseudo

@Component({
  selector: 'dialog-edit-profil',
  templateUrl: 'dialog-edit-profil.html',
})

export class DialogEditProfil {

  constructor(
    public dialogRef: MatDialogRef<DialogEditProfil>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}


  onNoClick(): void {
    this.dialogRef.close();
  }
}

//edit profil image

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';
  constructor(public src: string, public file: File) {}
}
/*
export class ImageUploadComponent {

  selectedFile: ImageSnippet;

  constructor(private userService: UserService){}

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }


  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.userService.editUserImage(this.selectedFile.file).subscribe(
        (res) => {
          this.onSuccess();
        },
        (err) => {
          this.onError()
        
        })
    });

    reader.readAsDataURL(file);
  }
}
*/