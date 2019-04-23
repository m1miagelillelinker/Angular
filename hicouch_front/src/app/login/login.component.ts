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
        }
    }
    
    logIn() {
        if(!this.auth.isAuthenticated()){
            this.auth.login();
        }
        else{
            this.router.navigate(['app/home']);
        }
    }

    /*
        submitted = false;
    success = false;

    user: User;
    form: FormGroup;

    closeSubscribe() {
        document.getElementById('subscribe').style.display='none';
    }

    displaySubscribe(){
        document.getElementById('subscribe').style.display='inline';
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            message: ['', Validators.required]
        });
    }

    loadUser(event: User) {
        this.user = event;
    }


    signIn() {
        this.submitted = true;

        if (this.form.invalid) {
            return;
        }

        this.success = true;
    }

    signUp() {
        this.submitted = true;

        if (this.form.invalid) {
            return;
        }

        this.success = true;
    }*/

}
