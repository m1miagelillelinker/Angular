import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';



@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) {
  }


  // getTest() {
  //   return this.http.get('https://hicjv2.azurewebsites.net/test');
  // }

  getUser(userid: string): Observable<User> {
    return this.http.get<User>(`https://hicjv2.azurewebsites.net/user/get?userId=${userid}`);
  }
}
