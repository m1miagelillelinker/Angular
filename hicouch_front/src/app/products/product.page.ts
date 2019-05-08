import { Component, OnInit, OnDestroy, ChangeDetectorRef, OnChanges } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { Movie, Book, Product } from '../shared/models/product';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-page',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPageComponent implements OnInit, OnDestroy, OnChanges {
  mainProduct: Product;
  productsRelated: Product[] = [];
  allProducts: Product[] = [];
  productId: string;
  idRelated: string;
  productSubscription: Subscription;


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params['productId'];
      // TODO remove line below when Associations availables
      this.idRelated = (this.productId === 'tt1201607') ? 'tt0120737' : 'tt1201607';
      this.fetchProducts();
    });
  }

  ngOnChanges() {
    this.route.params.subscribe(params => {
      this.productId = params['productId'];
      // TODO remove line below when Associations availables
      this.idRelated = (this.productId === 'tt1201607') ? 'tt0120737' : 'tt1201607';
      this.fetchProducts();
    });
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
    this.productService.getMovieByTitle('Totoro').subscribe((movie: any) => {
      movie.title = movie.title;
      movie.type = movie.type;
      movie.description = movie.description;
      this.allProducts.push(movie);
    });
  }

  ngOnDestroy() {
    if (this.productSubscription) { this.productSubscription.unsubscribe(); }
  }

  loadMoviePage(event) {
    // this.changeDetectorRef.detectChanges();
    event.id = event.id;
    this.router.navigate(['app/products/', event.id]);
    this.fetchProducts();
}

}
