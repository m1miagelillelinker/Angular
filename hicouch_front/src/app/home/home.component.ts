import { Injectable } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentification.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})

@Injectable()
export class HomeComponent implements OnInit {
    //@Input() user: User;
    private loggedUser: User;

    constructor(
        private userService: UserService,
        private router: Router,
        public auth: AuthenticationService
    ) { }

    ngOnInit() {
        if (this.auth.isAuthenticated()) {
          this.loggedUser = this.auth.loggedUser;
        }
    }

    goToProducts() {
        this.router.navigate(['app/products']);
    }


}
