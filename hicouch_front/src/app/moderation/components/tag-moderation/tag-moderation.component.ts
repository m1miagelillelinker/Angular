import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Tag} from '../../../shared/models/tag';
import {HicouchAPIService} from '../../../shared/services/hicouchAPI.service';
import {ProductService} from '../../../shared/services/product.service';
import {AssociationService} from '../../../shared/services/association.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SignalementService} from '../../../shared/services/signalement.service';

@Component({
    selector: 'app-tag-moderation',
    templateUrl: './tag-moderation.component.html',
    styleUrls: ['./tag-moderation.component.scss'],
})
export class TagModerationComponent implements OnInit, OnDestroy {
    tags: Array<Tag>;

    constructor(
        private signalementService: SignalementService,
    ) { }

    ngOnInit() {
        this.loadTags();
    }

    ngOnDestroy() {

    }

    /**
     * Retrieves the proposed tags
     */
    loadTags() {
        this.signalementService.loadTags().subscribe((json: Array<Tag>) => this.tags = json);
    }

    /**
     * Accepts the proposed tag
     * @param idSignalement
     */
    acceptTag(idTag: number) {
        this.signalementService.acceptTag(idTag).subscribe(() => this.loadTags());
    }

    /**
     * Refuses the proposed tag
     * @param idSignalement
     */
    refuseTag(idTag: number) {
        this.signalementService.refuseTag(idTag).subscribe(() => this.loadTags());
    }

}
