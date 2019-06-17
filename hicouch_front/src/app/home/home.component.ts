import {Injectable} from '@angular/core';
import {Component, OnInit, Input} from '@angular/core';
import {User} from '../shared/models/user';
import {Router} from '@angular/router';
import {AuthenticationService} from '../shared/services/authentification.service';
import {Product} from '../shared/models/product';
import {Subscription} from 'rxjs';
import {ProductService} from '../shared/services/product.service';
import {UserService} from '../shared/services/user.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})

@Injectable()
export class HomeComponent implements OnInit {
  @Input() user: User;

  constructor(
    private router: Router,
    public auth: AuthenticationService,
    private userService: UserService
  ) { }

    ngOnInit() {
        if (this.auth.isAuthenticated()) {
            this.userService.getCurrentUser().subscribe((u: User) => this.user = u);
        }
    }

}
