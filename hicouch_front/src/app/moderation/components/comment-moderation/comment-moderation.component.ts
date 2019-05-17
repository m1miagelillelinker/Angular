import {Component, OnDestroy, OnInit} from '@angular/core';
import {Tag} from '../../../shared/models/tag';
import {HicouchAPIService} from '../../../shared/services/hicouchAPI.service';
import {Commentaire} from '../../../shared/models/commentaire';

@Component({
    selector: 'app-comment-moderation',
    templateUrl: './comment-moderation.component.html',
    styleUrls: ['./comment-moderation.component.scss'],
})
export class CommentModerationComponent implements OnInit, OnDestroy {

    commentaires: Array<Commentaire>;

    constructor(
        private api: HicouchAPIService
    ) { }

    ngOnInit() {
        this.loadCommentaires();

    }

    ngOnDestroy() {

    }

    loadCommentaires(){
        this.api.getCommentairesToModerate().subscribe((json: Array<Commentaire>) => this.commentaires = json);
    }

    acceptComment(idComment: number) {
        this.api.validateComment(idComment).subscribe(() => this.loadCommentaires());
    }

    refuseComment(idComment: number) {
        this.api.refuseComment(idComment).subscribe(() => this.loadCommentaires());
    }
}
