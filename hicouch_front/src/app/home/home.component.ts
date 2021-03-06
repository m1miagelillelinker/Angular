import {Injectable} from '@angular/core';
import {Component, OnInit, Input} from '@angular/core';
import {User} from '../shared/models/user';
import {Router} from '@angular/router';
import {AuthenticationService} from '../shared/services/authentification.service';
import {ProductService} from '../shared/services/product.service';
import {UserService} from '../shared/services/user.service';
import {AssociationService} from '../shared/services/association.service';
import {Association} from '../shared/models/association';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})

@Injectable()
export class HomeComponent implements OnInit {
    @Input() user: User;

    associations: Association[];

    constructor(
        private router: Router,
        public auth: AuthenticationService,
        public productService: ProductService,
        public associationService: AssociationService,
        private userService: UserService
    ) { }

    ngOnInit() {
        if (this.auth.isAuthenticated()) {
            this.userService.getCurrentUser().subscribe((u: User) => this.user = u);
        }
        this.associationService.getLastAssociations().subscribe(
            (associations: Association[]) => {
                this.associations = this.getLastAssociations(associations);
            });
    }

    getLastAssociations(assos: Association[]) {
      return  assos.filter((a) => a.association.id % 2 === 0);
    }

    goTo(product) {
        this.router.navigate(['app/products', product.type, product.id]);
    }


}
