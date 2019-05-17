import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Tag} from '../../../shared/models/tag';
import {HicouchAPIService} from '../../../shared/services/hicouchAPI.service';
import {ProductService} from '../../../shared/services/product.service';
import {AssociationService} from '../../../shared/services/association.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-tag-moderation',
    templateUrl: './tag-moderation.component.html',
    styleUrls: ['./tag-moderation.component.scss'],
})
export class TagModerationComponent implements OnInit, OnDestroy {

    tags: Array<Tag>;

    constructor(
        private api: HicouchAPIService
    ) { }

    ngOnInit() {
        this.loadTags();
    }

    ngOnDestroy() {

    }

    loadTags(){
        this.api.getTagsToModerate().subscribe((json: Array<Tag>) => this.tags = json);
    }

    acceptTag(idTag: number) {
        this.api.validateTag(idTag).subscribe(() => this.loadTags());
    }

    refuseTag(idTag: number) {
        this.api.refuseTag(idTag).subscribe(() => this.loadTags());
    }

}
