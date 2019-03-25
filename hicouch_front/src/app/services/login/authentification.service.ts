import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../../shared/models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    
}