import { Component, OnInit, OnDestroy, ChangeDetectorRef, OnChanges } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { TagService } from '../shared/services/tag.service';
import { Product } from '../shared/models/product';
import { Router, ActivatedRoute, Params, RoutesRecognized } from '@angular/router';
import { AssociationService } from '../shared/services/association.service';
import { Association } from '../shared/models/association';
import { HicouchAPIService } from '../shared/services/hicouchAPI.service';
import { Subscription, Observable } from 'rxjs';
import { MatAutocompleteModule, MatIconModule } from '@angular/material';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Tag } from '../shared/models/tag';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPageComponent implements OnInit, OnChanges, OnDestroy {
  mainProduct: Product;
  productsRelated: Association[] = [];
  allProducts: any[];
  filteredProducts: any[] = [];
  productId: string;
  productType: string;
  idRelated: string;
  productSubscription: Subscription;
  user: User;

  tagControl = new FormControl();
  tags: Tag[] = [];
  filteredTags: Observable<string[]>;
  showInput = false;


  constructor(
    private productService: ProductService,
    private tagService: TagService,
    private associationService: AssociationService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.productId = param['productId'];
      this.productType = param['productType'];
      this.fetchProducts();
    });

  }

  ngOnChanges() {
    this.route.params.subscribe(param => {
      this.productId = param['productId'];
      this.productType = param['productType'];
      this.fetchProducts();
    });

  }

  /**
   * Retrieves all informations about a product
   */
  fetchProducts() {
    this.userService.getCurrentUser().subscribe(user => this.user = user);
    this.productSubscription = this.productService.getProductByTypeAndId(this.productId, this.productType).subscribe((p: Product) => {
      this.mainProduct = p;
      this.associationService.fetchtAssociationByProduct(this.mainProduct.id).subscribe((json: any) => {
        this.allProducts = json;
        const topMovie = json.filter(prod => prod.productB.type === 'film')[0];
        const topBook = json.filter(prod => prod.productB.type === 'book')[0];
        const topGame = json.filter(prod => prod.productB.type === 'game')[0];
        const topSerie = json.filter(prod => prod.productB.type === 'serie')[0];
        this.productsRelated = [];
        // tslint:disable-next-line:curly
        if (topMovie != null) this.productsRelated.push(topMovie);
        // tslint:disable-next-line:curly
        if (topSerie != null) this.productsRelated.push(topSerie);
        // tslint:disable-next-line:curly
        if (topBook != null) this.productsRelated.push(topBook);
        // tslint:disable-next-line:curly
        if (topGame != null) this.productsRelated.push(topGame);

        this.filteredProducts = this.allProducts;
        if (this.allProducts && this.allProducts.length > 0) {
          this.tagService.getTags(this.productId).subscribe((tjson: any) => {
            tjson.forEach(tag => {
              if (tag.status === 2) {
                this.tags.push(tag);
              }
            });
          });
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.productSubscription) { this.productSubscription.unsubscribe(); }
  }

  /**
   * Submits a proposed tag to moderation
   */
  submit() {
    this.tagService.addTag(this.tagControl.value, this.productId)
      .subscribe(() => this.tagService.getTags(this.productId).subscribe((json: any) => this.tags = json));
    this.setInputFVisibility(false);
  }

  /**
   * Manage the visibility of the input to add a tag
   * @param visible
   */
  setInputFVisibility(visible: boolean) {
    this.showInput = visible;
  }

  /**
   *
   * @param event
   */
  loadMoviePage(event) {
    this.router.navigate(['app/products/', event.id]);
    this.fetchProducts();
  }

  filterList(event) {
    // this.fetchProducts();
    this.filteredProducts = [];
    if (event.length === 4) {
      this.fetchProducts();
      Object.assign(this.filteredProducts, this.allProducts);
    } else {
      if (event.length > 0 && event != null && event !== []) {
        event.forEach(element => {
          this.allProducts.forEach(asso => {
            if (asso.productB.type === element) {
              this.filteredProducts.push(asso);
            }
          });
        });
      } else {
        this.filteredProducts = [];
      }
    }
  }

}
