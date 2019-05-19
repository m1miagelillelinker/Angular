import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HicouchAPIService} from '../../../shared/services/hicouchAPI.service';
import {Signalement} from '../../../shared/models/signalement';

@Component({
    selector: 'app-user-moderation',
    templateUrl: './user-moderation.component.html',
    styleUrls: ['./user-moderation.component.scss'],
})
export class UserModerationComponent implements OnInit, OnDestroy {

    signalements: Array<Signalement>;

    constructor(
        private api: HicouchAPIService
    ) { }

    ngOnInit() {
        this.loadUsers();
        this.signalements.forEach((s) => console.log(s));
    }

    ngOnDestroy() {

    }

    loadUsers() {
        this.api.listUsersToModerate().subscribe((json: Array<Signalement>) => this.signalements = json);
    }

    acceptSignalement(idSignalement: number) {
        this.api.confirmeSignalement(idSignalement).subscribe(() => this.loadUsers());
    }

    refuseSignalement(idSignalement: number) {
        this.api.refuseSignalement(idSignalement).subscribe(() => this.loadUsers());
    }

}
