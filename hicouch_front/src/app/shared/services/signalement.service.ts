import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Signalement } from '../models/signalement';
import {User} from '../models/user';



@Injectable({
    providedIn: 'root',
})
export class SignalementService {

    constructor(private http: HttpClient) {
    }

    addSignalement(signalement: Signalement) {
        return this.http.put(  `//localhost:8080/newSignalement`, signalement);
    }

    getSignalementById(signalementId: number) {
        return this.http.get<Signalement>(`//localhost:8080/get?signalementId=${signalementId}`);
    }

    getSignalementByStatus(statusId: number) {
        return this.http.get<Signalement>(`//localhost:8080/list?status=${statusId}`);
    }

}
