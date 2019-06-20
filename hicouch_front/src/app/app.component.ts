import { Component, Injector, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from './shared/services/authentification.service';
import { User } from './shared/models/user';
import { UserService } from './shared/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    user: User;
    @Output() userSelected = new EventEmitter();

    userSubscription: Subscription;
    routerSubscription: Subscription;
    constructor(
        injector: Injector,
        public router: Router,
        private auth: AuthenticationService,
        private userService: UserService,
    ) {
        // tslint:disable-next-line:no-unused-expression
        injector;

        this.routerSubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                const url = router.url;
            }
        });
    }

    ngOnInit(): void {
        if (this.auth.isAuthenticated()) {
            this.userService.getCurrentUser().subscribe((u: User) => this.user = u);
        }
    }

    isConnected(): boolean {
        return this.auth.isAuthenticated();
    }

    loadMoviePage(event) {
        // this.changeDetectorRef.detectChanges();
        event.id = event.id;
        this.router.navigate(['app/products/', event.id]);
    }

    ngOnDestroy(): void {
        if (this.routerSubscription) { this.routerSubscription.unsubscribe(); }
        if (this.userSubscription) { this.userSubscription.unsubscribe(); }
    }


}
