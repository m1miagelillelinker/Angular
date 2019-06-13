import { Injectable } from '@angular/core';
import { Comment } from '../models/comment';
import {HicouchAPIService} from './hicouchAPI.service';



@Injectable({
    providedIn: 'root',
})
export class CommentService {

    constructor(private api: HicouchAPIService) {
    }

    putComment(comment: Comment, idAsso: number ) {
        return this.api.addCommentaire(comment.iduser, idAsso, comment.commentaire);
    }

}
