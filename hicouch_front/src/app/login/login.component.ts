import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/login/authentification.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
    title = "HiCouch";
    submitted = false;
    success = false;
    
    user: User;
    form: FormGroup;

    constructor(private formBuilder: FormBuilder) {
    }
    
    
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
    }
    
//    // The current application coordinates were pre-registered in a B2C tenant.
//        var applicationConfig = {
//            clientID: 'bf50a854-4e0c-4e21-95da-7b5b2424f025',
//            authority: "https://login.microsoftonline.com/tfp/hicouch.onmicrosoft.com/B2C_1_mail",
//            b2cScopes: ["https://hicouch.onmicrosoft.com/hello/demo.read"],
//            webApi: 'http://localhost:5000/hello',
//        };
}