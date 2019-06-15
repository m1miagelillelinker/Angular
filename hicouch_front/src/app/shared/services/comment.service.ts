import {Injectable} from '@angular/core';
import {Comment} from '../models/comment';
import {HicouchAPIService} from './hicouchAPI.service';


@Injectable({
    providedIn: 'root',
})
export class CommentService {

    constructor(private api: HicouchAPIService) {
    }

    putComment(comment: string, idPair: number) {
        const secureComment = {
            commentaire: comment,
            idPair: idPair,
        };
        return this.api.addCommentaire(secureComment);
    }

}
