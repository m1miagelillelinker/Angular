import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from './authentification.service';

@Injectable()
export class CanActivateGuardService implements CanActivate {

    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) {}

    canActivate(): boolean {
        const userLogedIn: boolean = this.authService.isAuthenticated();
        if (!userLogedIn) {
            this.router.navigate(['/app/login']);
        }
        return userLogedIn;
    }

}
