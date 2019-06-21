import {Injectable} from '@angular/core';
import {Comment} from '../models/comment';
import {HicouchAPIService} from './hicouchAPI.service';


@Injectable({
    providedIn: 'root',
})
export class CommentService {

    constructor(private api: HicouchAPIService) {
    }

    putComment(idUser: any, comment: string, idPair: number) {
        const secureComment = {
            idUser,
            commentaire: comment,
            idPair: idPair,
        };
        return this.api.addCommentaire(secureComment).subscribe(() => {});
    }

    update(comment: string, idCommentaire: number) {
        const secureComment = {
            commentaire: comment,
            id: idCommentaire,
        };
        return this.api.updateCommentaire(secureComment).subscribe(() => {});
    }

    getCommentByIdPair(idPair: number) {
        return this.api.getCommentaireByPair(idPair);
    }

}
