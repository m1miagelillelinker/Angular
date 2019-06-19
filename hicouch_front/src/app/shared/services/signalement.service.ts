import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Signalement} from '../models/signalement';
import {User} from '../models/user';
import {HicouchAPIService} from './hicouchAPI.service';


@Injectable({
    providedIn: 'root',
})
export class SignalementService {

    constructor(private api: HicouchAPIService) {
    }

    signalCommentaire(idCommentaire: number, idAuteur: number, message: string) {
        const signalement = {
            typeSignalement: 'comment',
            signaledCommentId: idCommentaire,
            message: message,
            idUser: idAuteur
        };
        return this.api.createSignalement(signalement);
    }

    signalUser(idUser: number, idAuteur: number, message: string) {
        const signalement = {
            typeSignalement: 'comment',
            signaledUserId: idUser,
            message: message,
            idUser: idAuteur
        };
        return this.api.createSignalement(signalement);
    }

    getSignalementById(signalementId: number) {
        return this.api.getSignalements(signalementId);
    }

    getSignalementByStatus(statusId: string) {
        return this.api.listSignalements(statusId);
    }

}
