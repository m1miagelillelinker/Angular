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
  allProducts: any[] = [];


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
      this.allProducts.push(movie);
      this.allProducts.push(this.productService.getBook());
      this.allProducts.push(movie);
      this.allProducts.push(this.productService.getBook());
      this.allProducts.push(movie);
      this.allProducts.push(this.productService.getBook());
    });
  }



}
