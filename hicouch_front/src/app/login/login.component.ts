import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../shared/services/authentification.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
    title = 'HiCouch';

    constructor(
        public auth: AuthenticationService,
        private router: Router
    ) {
        auth.handleAuthentication();
    }

    ngOnInit() {
        if (this.auth.isAuthenticated()) {
          this.auth.renewTokens();
          this.router.navigate(['app/home']);
        }
    }

    /**
     * Checks if the authentication is well done and redirect to homepage
     */
    logIn() {
        if (!this.auth.isAuthenticated()) {
            this.auth.login();
        } else {
            this.router.navigate(['app/home']);
        }
    }

}
