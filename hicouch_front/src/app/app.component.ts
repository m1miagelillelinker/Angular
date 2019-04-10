import { Component, Injector, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from './shared/services/authentification.service';
import { User } from './shared/models/user';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    user: User;
    @Output() userSelected = new EventEmitter();
    constructor(
        injector: Injector,
        public router: Router,
        private authService: AuthenticationService,
        private userService: UserService,
    ) {
        // tslint:disable-next-line:no-unused-expression
        injector;

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                const url = router.url;
            }
        });
    }

    ngOnInit(): void {
        this.userService.getUser(1).subscribe(
            (user: User) => {
              console.log(user);
              this.user = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
              };
              this.userSelected.emit(this.user);
            });
    }
}
