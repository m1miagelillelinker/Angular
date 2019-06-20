import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import {HicouchAPIService} from './hicouchAPI.service';



@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private api: HicouchAPIService) {
  }

  getUser(userId: number): Observable<User> {
    return this.api.getUser(userId);
  }

  getCurrentUser(): Observable<User> {
    return this.api.getCurrentUser();
  }

  getFollowers(userId: number): Observable<User[]> {
    return this.api.getFollowers(userId);
  }

  getFollows(userId: number): Observable<User[]> {
    return this.api.getFollows(userId);
  }

  editUserImage(user: User): Observable<User> {
      return this.api.uploadImage(user);
  }

  editUserPseudo(user: User): Observable<User> {
    return this.api.updatePseudo({id: user.id, pseudo: user.pseudo});
  }
  follow(x, y) {
    return this.api.follow(x, y);
  }

  unFollow(x, y) {
    return this.api.unfollow(x, y);
  }

  getHistoryById(id): Observable<any> {
    return this.api.getHistory(id);
  }
}
