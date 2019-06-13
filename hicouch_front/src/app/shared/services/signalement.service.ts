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
        return this.http.put(  `//hicjv4.azurewebsites.net/newSignalement`, signalement);
    }

    getSignalementById(signalementId: number) {
        return this.http.get<Signalement>(`//hicjv4.azurewebsites.net/get?signalementId=${signalementId}`);
    }

    getSignalementByStatus(statusId: number) {
        return this.http.get<Signalement>(`//hicjv4.azurewebsites.net/list?status=${statusId}`);
    }

}
