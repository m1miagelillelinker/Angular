import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../shared/services/product.service';
import {AssociationService} from '../shared/services/association.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HicouchAPIService} from '../shared/services/hicouchAPI.service';
import {Tag} from '../shared/models/tag';

@Component({
    selector: 'app-moderation-page',
    templateUrl: './moderation.page.html',
    styleUrls: ['./moderation.page.scss'],
})
export class ModerationPageComponent implements OnInit, OnDestroy {

    tagMode = false;
    commentMode = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private changeDetectorRef: ChangeDetectorRef,
        private api: HicouchAPIService
    ) { }

    ngOnInit() {

    }

    ngOnDestroy() {

    }

    toggleFeature(event: string) {
        switch (event) {
            case 'tag':
                this.tagMode = true;
                this.commentMode = false;
                break;
            case 'comment':
                this.tagMode = false;
                this.commentMode = true;
                break;
        }
    }
}
