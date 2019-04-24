import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { Movie, Book } from '../shared/models/product';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-page',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPageComponent implements OnInit, OnDestroy {
  movie: Movie;
  productsRelated: any[] = [];
  allProducts: any[] = [];

  productSubscription: Subscription;


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // tt3896198
    const productId = this.route.snapshot.paramMap.get('productId');
    this.productSubscription = this.productService.getMovieById(productId).subscribe((movie: any) => {
      this.movie = movie;
      this.movie.title = movie.Title;
      this.movie.type = movie.Type;
      this.movie.description = movie.Plot;
    });
    this.productSubscription = this.productService.getMovieById('tt0120737').subscribe((movie: any) => {
      movie.id = '1';
      movie.title = movie.Title;
      movie.type = movie.Type;
      movie.description = movie.Plot;
      this.productsRelated.push(movie);
      this.productService.getBookById('9780613322744').subscribe((book: any) => {
        const mybook = book.items[0].volumeInfo;
        mybook.type = 'book';
        mybook.image =  book.items[0].volumeInfo.imageLinks.thumbnail;
        this.allProducts.push(mybook);
        this.productsRelated.push(mybook);
        movie.id = '2';
        this.allProducts.push(movie);
        this.productService.getBookById('9782070524327').subscribe((book2: any) => {
          const mybook2 = book2.items[5].volumeInfo;
          mybook2.type = 'book';
          mybook2.image =  book2.items[5].volumeInfo.imageLinks.thumbnail;
          this.allProducts.push(mybook2);
        });
        this.allProducts.push(this.productService.getBook());
        movie.id = '3';
        this.allProducts.push(movie);
        movie.id = '4';
        this.allProducts.push(movie);
        this.allProducts.push(mybook);
      });
    });
    this.productService.getMovieByTitle('Harry').subscribe((movie: any) => {
      movie.title = movie.Title;
      movie.type = movie.Type;
      this.allProducts.push(movie);
    });
    // this.productSubscription = this.productService.getMovieByTitle('Harry').subscribe((movie: any) => {
    //   movie.title = movie.Title;
    //   movie.type = movie.Type;
    //   this.allProducts.push(movie);
    // });
  }

  ngOnDestroy() {
    if (this.productSubscription) { this.productSubscription.unsubscribe(); }
  }



}
