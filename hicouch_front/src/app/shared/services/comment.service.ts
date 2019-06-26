import {Injectable} from '@angular/core';
import {Comment} from '../models/comment';
import {HicouchAPIService} from './hicouchAPI.service';


@Injectable({
    providedIn: 'root',
})
export class CommentService {

    constructor(private api: HicouchAPIService) {
    }

    /**
     * Save a comment in database
     * @param idUser the id of the user who made the comment
     * @param comment the comment to save
     * @param idPair the id of the association linked to the comment
     */
    putComment(idUser: any, comment: string, idPair: number) {
        const secureComment = {
            idUser,
            commentaire: comment,
            idPair: idPair,
        };
        return this.api.addCommentaire(secureComment).subscribe(() => {});
    }

    /**
     * Updates a comment
     * @param comment the comment to update
     * @param idCommentaire the id of the comment to update
     */
    update(comment: string, idCommentaire: number) {
        const secureComment = {
            commentaire: comment,
            id: idCommentaire,
        };
        return this.api.updateCommentaire(secureComment).subscribe(() => {});
    }

    /**
     * Retrieves comments about an association
     * @param idPair
     */
    getCommentByIdPair(idPair: number) {
        return this.api.getCommentaireByPair(idPair);
    }

}
