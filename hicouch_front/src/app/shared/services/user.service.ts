import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import {HicouchAPIService} from './hicouchAPI.service';



@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient, private api: HicouchAPIService) {
  }


  // getTest() {
  //   return this.http.get('//hicjv5.azurewebsites.net/test');
  // }

  getUser(userId: number): Observable<User> {
    return this.api.getUser(userId);
  }

  getCurrentUser(): Observable<User> {
    return this.api.getCurrentUser();
  }
}
