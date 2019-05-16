import { Component, OnInit, Input } from '@angular/core';
import { User } from '../shared/models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentification.service';
import { Product } from '../shared/models/product';
import { Subscription } from 'rxjs';
import { ProductService } from '../shared/services/product.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
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

  goToProducts() {
    this.router.navigate(['app/products']);
  }

  loadMoviePage(event) {
    console.log(event);
    // this.changeDetectorRef.detectChanges();
    event.id = event.id;
    this.router.navigate(['app/products/', event.id]);
    this.fetchProducts();
}

fetchProducts() {
  // tt3896198
  // TODO : DEMOCK
  this.productsRelated = [];
  this.allProducts = [];
  this.productSubscription = this.productService.getMovieById(this.productId).subscribe((movie: any) => {
    if (movie) {
      console.log(movie);
      this.mainProduct = movie;
      this.mainProduct.title = movie.title;
      this.mainProduct.type = movie.type;
      this.mainProduct.description = movie.description;
    }
  });
  this.productSubscription = this.productService.getMovieById(this.idRelated).subscribe((movie: any) => {
    movie.id = this.idRelated;
    if (movie) {
      movie.title = movie.title;
      movie.type = movie.type;
      movie.description = movie.description;
    }
    this.productsRelated.push(movie);
    this.productService.getBookById('9781442499577').subscribe((book: any) => {
      console.log (book);
      if (book.items) {

        const mybook = book.items[0].volumeInfo;
        mybook.type = 'book';
        mybook.image =  'assets/images/everworld1.jpg';
        this.allProducts.push(mybook);
        this.allProducts.push(mybook);
        this.productsRelated.push(mybook);
      }
      movie.id = this.idRelated;
      this.allProducts.push(movie);
      this.productService.getBookById('9782070524327').subscribe((book2: any) => {
          const mybook2 = book2.items[0].volumeInfo;
          mybook2.type = 'book';
          mybook2.image =  'assets/images/narnia.jpg';
          this.allProducts.push(mybook2);
      });
      this.allProducts.push(this.productService.getBook());
      movie.id = this.idRelated;
      this.allProducts.push(movie);
      // this.allProducts.push(mybook);
    });
  });
  /*this.productService.getMovieByTitle('Totoro').subscribe((movie: any) => {
    movie.title = movie.title;
    movie.type = movie.type;
    movie.description = movie.description;
    this.allProducts.push(movie);
  });*/
}



}
