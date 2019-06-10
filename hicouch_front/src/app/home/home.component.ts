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
  mainProduct: Product;
  productsRelated: Product[] = [];
  allProducts: Product[] = [];
  productId: string;
  idRelated: string;
  productSubscription: Subscription;

  constructor(
    private router: Router,
    public auth: AuthenticationService,
    public productService: ProductService,
    private userService: UserService
  ) { }

  ngOnInit() {
    // this.router.navigate(['app/products/', 'tt0120737']);
    this.userService.getUser(1).subscribe(
      (user: User) => {
        console.log(user);
        this.user = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
        };
      });
  }

    ngOnInit() {
        if (this.auth.isAuthenticated()) {
            this.userService.getCurrentUser().subscribe((u: User) => this.loggedUser = u);


        }
    }

  loadMoviePage(event) {
    console.log(event);
    // this.changeDetectorRef.detectChanges();
    event.id = event.id;
    this.router.navigate(['app/products/', event.id]);
    this.fetchProducts();
}
    goToProducts() {
        this.router.navigate(['app/products']);
    }

}
