import { Component, OnInit, OnDestroy, ChangeDetectorRef, OnChanges } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { Product } from '../shared/models/product';
import { Router, ActivatedRoute, Params, RoutesRecognized } from '@angular/router';
import { Subscription } from 'rxjs';
import { AssociationService } from '../shared/services/association.service';
import { Association } from '../shared/models/association';
import { HicouchAPIService } from '../shared/services/hicouchAPI.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPageComponent implements OnInit, OnDestroy, OnChanges {
  mainProduct: Product;
  productsRelated: any[] = [];
  allProducts: any[] = [];
  filteredProducts: any[] = [];
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
    this.router.events.subscribe(val => {

      if (val instanceof RoutesRecognized) {

          const param = val.state.root.firstChild.params;
            this.productId = param['productId'];
            console.log(this.productId);
            this.fetchProducts();
      }
  });

  }

  ngOnChanges() {
    this.router.events.subscribe(val => {

      if (val instanceof RoutesRecognized) {

          const param = val.state.root.firstChild.params;
            this.productId = param['productId'];
            console.log(this.productId);
            this.fetchProducts();
      }
  });
  }
  fetchProducts() {
    let productId;
    this.router.events.subscribe(val => {
      if (val instanceof RoutesRecognized) {
          const param = val.state.root.firstChild.params;
            productId = param['productId'];
            console.log(productId);
      }
  });
    this.productSubscription = this.productService.getMovieById(this.productId).subscribe((movie: any) => {
      this.mainProduct = movie;
      this.associationService.fetchtAssociationByProduct(this.mainProduct.id).subscribe((json: any) => {
        this.allProducts = json;
        console.log(json);
        if (this.allProducts && this.allProducts.length > 0) {
          this.productsRelated = [];
          this.productsRelated.push(json[0]);
        }
        if (json.length === 0) {
          this.allProducts = [];
          console.log('ah');
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.productSubscription) { this.productSubscription.unsubscribe(); }
  }

  loadMoviePage(event) {
    event.id = event.id;
    console.log(event);
    this.router.navigate(['app/products/', event.id]);
    this.fetchProducts();
  }

  filterList(event) {
    console.log(event);
    this.filteredProducts = [];
    if (event.length === 4) {
      this.filteredProducts = this.allProducts;
    } else {
      if (event.length > 0 && event != null && event !== []) {
        event.forEach(element => {
          this.allProducts.forEach(asso => {
            if (asso.product.type === element) {
              this.filteredProducts.push(asso.product);
            }
          });
        });
      } else {
        this.filteredProducts = [];
       }
    }

      console.log(this.filteredProducts);
      // console.log(event);
      // this.allProducts.filter(p => console.log(p));

  }

}
