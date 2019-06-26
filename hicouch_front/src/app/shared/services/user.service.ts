import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import {HicouchAPIService} from './hicouchAPI.service';



@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient,
    private api: HicouchAPIService) {
  }

  /**
   * Get user by id
   * @param userId
   */
  getUser(userId: number): Observable<User> {
    return this.api.getUser(userId);
  }

  /**
   * Gets logged user
   */
  getCurrentUser(): Observable<User> {
    return this.api.getCurrentUser();
  }

  /**
   * Get users who follewed this user
   * @param userId
   */
  getFollowers(userId: number): Observable<User[]> {
    return this.api.getFollowers(userId);
  }

  /**
   * Gets the users that this user follows
   * @param userId
   */
  getFollows(userId: number): Observable<User[]> {
    return this.api.getFollows(userId);
  }

  /**
   * Edit profile picture of an user
   * @param user
   */
  editUserImage(user: User): Observable<User> {
      return this.api.uploadImage(user);
  }

  /**
   * Edit the pseudo of this user
   * @param user
   */
  editUserPseudo(user: User): Observable<User> {
    return this.api.updatePseudo({id: user.id, pseudo: user.pseudo});
  }

  /**
   * Saves the subscription between two users
   * @param x
   * @param y
   */
  follow(x, y) {
    return this.api.follow(x, y);
  }

  /**
   * Deletes the subscription between two users
   * @param x
   * @param y
   */
  unFollow(x, y) {
    return this.api.unfollow(x, y);
  }

  /**
   * Gets the history of activities of an user and his subscriptions
   * @param id
   */
  getHistoryById(id): Observable<any> {
    return this.http.get( `//hicjv8.azurewebsites.net/historique/${id}`, id);
  }
}
