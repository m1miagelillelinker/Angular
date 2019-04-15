import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { Movie, Book } from '../shared/models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPageComponent implements OnInit {
  movie: Movie;
  productsRelated: any[] = [];
  allProducts: any[] = [];


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // tt3896198
    const productId = this.route.snapshot.paramMap.get('productId');
    console.log(productId);
    this.productService.getMovieById(productId).subscribe((movie: Movie) => {
      this.movie = movie;
    });
    this.productService.getMovieById('tt0120737').subscribe((movie: Movie) => {
      movie.id = '1';
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
          console.log(book2);
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
    this.productService.getMovieByTitle('Harry').subscribe((movie) => {
      this.allProducts.push(movie);
    });
  }



}
