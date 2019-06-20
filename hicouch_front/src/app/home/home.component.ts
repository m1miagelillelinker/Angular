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
        this.associations = [];
        if (this.auth.isAuthenticated()) {
            this.userService.getCurrentUser().subscribe((u: User) => this.user = u);
        }
        this.associationService.getLastAssociations().subscribe(
            (associations: Association[]) => {
                this.associations = this.getLastAssociations(associations);
            });
    }

    getLastAssociations(assos: Association[]) {
        console.log(assos);
        const list = [];
        let x ;
        for ( x = 0; x < assos.length; x++ ) {
            list[assos[x]['association']['idPair']] = assos[x];
        }
        assos = new Array();
        let asso;
        for (asso in list ) {
            assos.push(list[asso]);
        }
        return assos;
/*

        for (asso in assos) {
            /!*      if (list.length !== 0) {
                    let j;
                    for (j in list) {
                      if (j.association.idPair !== i.association.idPair) {
                        list.push(i);
                      }
                    }
                  } else {
                    list.push(i);
                  }*!/
        }
        assos = list;*/
    }

    goTo(product) {
        this.router.navigate(['app/products', product.type, product.id]);
    }


}
