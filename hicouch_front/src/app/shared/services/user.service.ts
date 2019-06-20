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

  follow(x, y) {
    return this.api.follow(x, y);
  }

  unFollow(x, y) {
    return this.api.unfollow(x, y);
  }
}
