import {Component, OnDestroy, OnInit} from '@angular/core';
import {Tag} from '../../../shared/models/tag';
import {HicouchAPIService} from '../../../shared/services/hicouchAPI.service';
import {Commentaire} from '../../../shared/models/commentaire';
import {Signalement} from '../../../shared/models/signalement';
import {SignalementService} from '../../../shared/services/signalement.service';

@Component({
    selector: 'app-comment-moderation',
    templateUrl: './comment-moderation.component.html',
    styleUrls: ['./comment-moderation.component.scss'],
})
export class CommentModerationComponent implements OnInit, OnDestroy {

    signalements: Array<Signalement>;

    constructor(
        private signalementService: SignalementService
    ) { }

    ngOnInit() {
        this.loadCommentaires();

    }

    ngOnDestroy() {

    }

    loadCommentaires() {
        this.signalementService.getCommentairesToModerate()
            .subscribe((json: Array<Signalement>) => this.signalements = json.filter(c => c.signaledComment !== undefined)); // double check
    }

    acceptSignalement(idSignalement: number) {
        this.signalementService.acceptSignalement(idSignalement).subscribe(() => this.loadCommentaires());
    }

    refuseSignalement(idSignalement: number) {
        this.signalementService.refuseSignalement(idSignalement).subscribe(() => this.loadCommentaires());
    }
}
