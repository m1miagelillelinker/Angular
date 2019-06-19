import {Component, OnDestroy, OnInit} from '@angular/core';
import {Tag} from '../../../shared/models/tag';
import {HicouchAPIService} from '../../../shared/services/hicouchAPI.service';
import {Commentaire} from '../../../shared/models/commentaire';
import {Signalement} from '../../../shared/models/signalement';

@Component({
    selector: 'app-comment-moderation',
    templateUrl: './comment-moderation.component.html',
    styleUrls: ['./comment-moderation.component.scss'],
})
export class CommentModerationComponent implements OnInit, OnDestroy {

    signalements: Array<Signalement>;

    constructor(
        private api: HicouchAPIService
    ) { }

    ngOnInit() {
        this.loadCommentaires();

    }

    ngOnDestroy() {

    }

    loadCommentaires() {
        this.api.listCommentsToModerate()
            .subscribe((json: Array<Signalement>) => this.signalements = json.filter(c => c.signaledComment !== undefined)); // double check
    }

    acceptSignalement(idSignalement: number) {
        this.api.confirmeSignalement(idSignalement).subscribe(() => this.loadCommentaires());
    }

    refuseSignalement(idSignalement: number) {
        this.api.refuseSignalement(idSignalement).subscribe(() => this.loadCommentaires());
    }
}
