import { Component, OnInit, OnDestroy, ChangeDetectorRef, OnChanges } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { Product } from '../shared/models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {AssociationService} from '../shared/services/association.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPageComponent implements OnInit, OnDestroy, OnChanges {
  mainProduct: Product;
  productsRelated: any[] = [];
  allProducts: any[] = [];
  productId: string;
  idRelated: string;
  productSubscription: Subscription;


  constructor(
    private productService: ProductService,
    private associationService: AssociationService,
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
    const productId = this.route.snapshot.paramMap.get('productId');
    this.productSubscription = this.productService.getMovieById(productId).subscribe((movie: any) => {
      this.mainProduct = movie;
      this.associationService.fetchtAssociationByProduct(this.mainProduct.id).subscribe((json: any) => {
        this.allProducts = json;
        this.productsRelated.push(json[0]);
        this.productService.getBookById('9782070541270').subscribe((book: any) => {
          book.type = 'book';
          const asso = {
            association: null,
            product: book,
          };
          this.productsRelated.push(asso);
          this.allProducts.push(asso);
        });
        // if (json.length === 0) {
        //   // tslint:disable-next-line:no-shadowed-variable
        //   this.productSubscription = this.productService.getMovieById('tt0120737').subscribe((movie: any) => {
        //     this.productsRelated.push(movie);
        //     this.productService.getBookById('9782809456820').subscribe((book: any) => {
        //       console.log (book);
        //       if (book.items) {
        //         const mybook = book.items[0].volumeInfo;
        //         mybook.type = 'book';
        //         mybook.image =  'assets/images/everworld1.jpg';
        //         this.allProducts.push(mybook);
        //         this.allProducts.push(mybook);
        //         this.productsRelated.push(mybook);
        //       }
        //       movie.id = this.idRelated;
        //       this.allProducts.push(movie);
        //       this.productService.getBookById('9781442499577').subscribe((book2: any) => {
        //         if (book.items) {
        //           const mybook2 = book2.items[0].volumeInfo;
        //           mybook2.type = 'book';
        //           mybook2.image =  'assets/images/narnia.jpg';
        //           this.allProducts.push(mybook2);
        //         }
        //       });
        //       this.allProducts.push(this.productService.getBook());
        //       movie.id = this.idRelated;
        //       this.allProducts.push(movie);
        //       // this.allProducts.push(mybook);
        //     });
        //   });
        //   // tslint:disable-next-line:no-shadowed-variable
        //   this.productService.getMovieByTitle('Harry').subscribe((movie: any) => {
        //     movie.title = movie.title;
        //     movie.type = movie.type;
        //     this.allProducts.push(movie);
        //   });
      //   }
      });
    });

  }

  ngOnDestroy() {
    if (this.productSubscription) { this.productSubscription.unsubscribe(); }
  }

  loadMoviePage(event) {
    event.id = event.id;
    this.router.navigate(['app/products/', event.id]);
    this.fetchProducts();
}

}
