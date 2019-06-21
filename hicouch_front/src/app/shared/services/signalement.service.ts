import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Signalement} from '../models/signalement';
import {User} from '../models/user';
import {HicouchAPIService} from './hicouchAPI.service';
import {Tag} from '../models/tag';


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

    getCommentairesToModerate(): any {
        return this.api.listCommentsToModerate();
    }

    getUsersToModerate(): any {
        return this.api.listUsersToModerate();
    }

    acceptSignalement(idSignalement: number): any {
        return this.api.confirmeSignalement(idSignalement);
    }

    refuseSignalement(idSignalement: number): any {
        return this.api.refuseSignalement(idSignalement);
    }

    loadTags(): any {
        return this.api.getTagsToModerate();
    }

    acceptTag(idTag: number): any {
        return this.api.validateTag(idTag);
    }

    refuseTag(idTag: number): any {
        return this.api.refuseTag(idTag);
    }

}
