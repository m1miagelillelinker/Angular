import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { Movie, Book } from '../shared/models/product';

@Component({
  selector: 'app-product-page',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPageComponent implements OnInit {
  movie: Movie;
  productsRelated: any[] = [];
  movieSelected = true;
  bookSelected = false;

  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.productService.getMovieById('tt3896198').subscribe((movie: Movie) => {
      this.movie = movie;
    });
    this.productService.getMovieById('tt0120737').subscribe((movie) => {
      this.productsRelated.push(movie);
      this.productsRelated.push(this.productService.getBook());
      console.log(this.productsRelated);
    });
  }

  selectTab(tab: string) {
    if (tab === 'movie') {
      this.movieSelected = true;
      this.bookSelected = false;
    } else {
      this.bookSelected = true;
      this.movieSelected = false;
    }
    console.log(this.productsRelated);
  }

}
