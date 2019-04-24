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
  //   return this.http.get('//localhost:8080/test');
  // }

  getUser(userid: string): Observable<User> {
    return this.http.get<User>(`//localhost:8090/user/get?userId=${userid}`);
  }
}
