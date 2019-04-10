import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    constructor(private http: HttpClient) {
    }

    getUser() {
        //
    }

    getCurrentUser() {
        return this.http.get<User>(`//localhost:8080/user/get?userId=1`);
    }

    log() {
        //
    }
}
