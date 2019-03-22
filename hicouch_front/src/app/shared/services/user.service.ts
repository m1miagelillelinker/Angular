import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUser(userid: number) {
    return this.http.get(`//localhost:8080/user/${userid}`);
  }
}
