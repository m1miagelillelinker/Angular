import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HicouchAPIService} from '../../../shared/services/hicouchAPI.service';
import {Signalement} from '../../../shared/models/signalement';
import {Router} from '@angular/router';
import {SignalementService} from '../../../shared/services/signalement.service';

@Component({
    selector: 'app-user-moderation',
    templateUrl: './user-moderation.component.html',
    styleUrls: ['./user-moderation.component.scss'],
})
export class UserModerationComponent implements OnInit, OnDestroy {

    signalements: Array<Signalement>;

    constructor(
        private signalementService: SignalementService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadUsers();
    }

    ngOnDestroy() {

    }

    loadUsers() {
        this.signalementService.getUsersToModerate()
            .subscribe((json: Array<Signalement>) => this.signalements = json.filter(c => c.signaledUser !== undefined)); // double check
    }

    goToUser(userId: number) {
        this.router.navigate(['app/account', userId]);
    }

    acceptSignalement(idSignalement: number) {
        this.signalementService.acceptSignalement(idSignalement).subscribe(() => this.loadUsers());
    }

    refuseSignalement(idSignalement: number) {
        this.signalementService.refuseSignalement(idSignalement).subscribe(() => this.loadUsers());
    }

}
