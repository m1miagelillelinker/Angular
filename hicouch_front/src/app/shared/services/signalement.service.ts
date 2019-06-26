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

    /**
     * Signal a comment
     * @param idCommentaire the id of the comment to signal
     * @param idAuteur the id of the user who signaled the comment
     * @param message the reason of the signalement
     */
    signalCommentaire(idCommentaire: number, idAuteur: number, message: string) {
        const signalement = {
            typeSignalement: 'comment',
            signaledCommentId: idCommentaire,
            message: message,
            idUser: idAuteur
        };
        return this.api.createSignalement(signalement);
    }

    /**
     * Signal an user
     * @param idUser the id of the user to signal
     * @param idAuteur the id of the user who signaled the comment
     * @param message the reason of the signalement
     */
    signalUser(idUser: number, idAuteur: number, message: string) {
        const signalement = {
            typeSignalement: 'comment',
            signaledUserId: idUser,
            message: message,
            idUser: idAuteur
        };
        return this.api.createSignalement(signalement);
    }

    /**
     * Retrieves the signaled comments
     */
    getCommentairesToModerate(): any {
        return this.api.listCommentsToModerate();
    }

    /**
     * Retrieves the signaled users
     */
    getUsersToModerate(): any {
        return this.api.listUsersToModerate();
    }

    /**
     * Accept a signalement
     * @param idSignalement
     */
    acceptSignalement(idSignalement: number): any {
        return this.api.confirmeSignalement(idSignalement);
    }

    /**
     * Refuses a signalement
     * @param idSignalement
     */
    refuseSignalement(idSignalement: number): any {
        return this.api.refuseSignalement(idSignalement);
    }

    /**
     * Retrieves the proposed tags
     */
    loadTags(): any {
        return this.api.getTagsToModerate();
    }

    /**
     * Accepts a proposed tag
     * @param idTag
     */
    acceptTag(idTag: number): any {
        return this.api.validateTag(idTag);
    }

    /**
     * Refuses a proposed tag
     * @param idTag
     */
    refuseTag(idTag: number): any {
        return this.api.refuseTag(idTag);
    }

}
