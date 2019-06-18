import {Component, OnInit, OnDestroy, ChangeDetectorRef, OnChanges} from '@angular/core';
import {ProductService} from '../shared/services/product.service';
import {TagService} from '../shared/services/tag.service';
import {Product} from '../shared/models/product';
import {Router, ActivatedRoute, Params, RoutesRecognized} from '@angular/router';
import {AssociationService} from '../shared/services/association.service';
import {Association} from '../shared/models/association';
import {HicouchAPIService} from '../shared/services/hicouchAPI.service';
import {Subscription, Observable} from 'rxjs';
import {MatAutocompleteModule, MatIconModule} from '@angular/material';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Tag} from '../shared/models/tag';
import {User} from '../shared/models/user';

@Component({
  selector: 'app-product-page',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPageComponent implements OnInit, OnChanges, OnDestroy {
  mainProduct: Product;
  productsRelated: Association[] = [];
  allProducts: any[] = [];
  filteredProducts: any[] = [];
  productId: string;
  productType: string;
  idRelated: string;
  productSubscription: Subscription;
  user: User;

    tagControl = new FormControl();
    tags: Tag[];
    filteredTags: Observable<string[]>;
    showInput = false;


  constructor(
    private productService: ProductService,
    private tagService: TagService,
    private associationService: AssociationService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

    ngOnInit() {
        this.route.params.subscribe(param => {
            this.productId = param['productId'];
            this.productType = param['productType'];
            console.log(this.productId);
            console.log(this.productType);
            this.fetchProducts();
        });
        /*this.router.events.subscribe(val => {

            if (val instanceof RoutesRecognized) {

                const param = val.state.root.firstChild.params;
                this.productId = param['productId'];
                this.productType = param['productType'];
                console.log(this.productId);
                console.log(this.productType);
                this.fetchProducts();
            }
        });*/

    }

    ngOnChanges() {
        this.route.params.subscribe(param => {
            this.productId = param['productId'];
            this.productType = param['productType'];
            console.log(this.productId);
            console.log(this.productType);
            this.fetchProducts();
        });

        /*this.router.events.subscribe(val => {

            if (val instanceof RoutesRecognized) {
                const param = val.state.root.firstChild.params;
                this.productId = param['productId'];
                this.productType = param['productType'];
                console.log(this.productId);
                console.log(this.productType);
                this.fetchProducts();
            }
        });*/
  }
  // fetchProducts() {
  //   let productId;
  //   this.router.events.subscribe(val => {
  //     if (val instanceof RoutesRecognized) {
  //         const param = val.state.root.firstChild.params;
  //           productId = param['productId'];
  //           console.log(productId);
  //     }
  // });
  //   this.productSubscription = this.productService.getMovieById(this.productId).subscribe((movie: any) => {
  //     this.mainProduct = movie;
  //     this.associationService.fetchtAssociationByProduct(this.mainProduct.id).subscribe((json: any) => {
  //       this.allProducts = json;
  //       console.log(json);
  //       if (this.allProducts && this.allProducts.length > 0) {
  //         this.productsRelated = [];
  //         this.productsRelated.push(json[0]);
  //       }
  //       if (json.length === 0) {
  //         this.allProducts = [];
  //         console.log('ah');
  //       }
  //     });
  //     this.tagService.getTags('tt0120737').subscribe((json: any) => this.tags = json);
  //   });
  // }

    fetchProducts() {
        this.productSubscription = this.productService.getProductByTypeAndId(this.productId, this.productType).subscribe((p: Product) => {
            this.mainProduct = p;
            this.associationService.fetchtAssociationByProduct(this.mainProduct.id).subscribe((json: any) => {
                this.allProducts = json;
                this.filteredProducts = this.allProducts;
                console.log(json);
                if (this.allProducts && this.allProducts.length > 0) {
                    this.tagService.getTags(this.productId).subscribe((tjson: any) => this.tags = tjson);
                    this.productsRelated.push(json[0]);
                }
            });
        });
    }

  ngOnDestroy() {
    if (this.productSubscription) { this.productSubscription.unsubscribe(); }
  }
/*
  private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
      return this.tags.filter(tag => tag.toLowerCase().includes(filterValue));
  }
*/
  submit() {
      console.log(this.tagControl.value);
        this.tagService.addTag(this.tagControl.value, this.productId)
            .subscribe(() => this.tagService.getTags(this.productId).subscribe((json: any) => this.tags = json));
      this.setInputFVisibility(false);
  }

  setInputFVisibility(visible: boolean) {
      this.showInput = visible;
  }
  loadMoviePage(event) {
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
  }

}
