import { Component, OnInit, OnDestroy, ChangeDetectorRef, OnChanges } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { TagService } from '../shared/services/tag.service';
import { Product } from '../shared/models/product';
import { AssociationService } from '../shared/services/association.service';
import { Association } from '../shared/models/association';
import { HicouchAPIService } from '../shared/services/hicouchAPI.service';
import { Subscription, Observable } from 'rxjs';
import { MatAutocompleteModule, MatIconModule } from '@angular/material';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { ActivatedRoute, Route, Router } from '@angular/router';

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

    tagControl = new FormControl();
    tags: string[] = ['One', 'Two', 'Three'];
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
        if (json.length === 0) {
          console.log('ah');
          // tslint:disable-next-line:no-shadowed-variable
          this.productSubscription = this.productService.getMovieById('tt0120737').subscribe((movie: any) => {
            movie.title = movie.title;
            movie.type = movie.type;
            movie.description = movie.description;
            this.productsRelated.push(movie);
          });
        }
      });
      this.tags = this.tagService.getTags();
      this.filteredTags = this.tagControl.valueChanges
          .pipe(
          startWith(''),
          map(value => this._filter(value))
          );
      
      // Faire un requête pour recupérer une liste de tags existants
      // Qu'on stockera dans tags
      // Et c'est sur cette liste qu'on filtera des trucs 
      
  }

  ngOnDestroy() {
    if (this.productSubscription) { this.productSubscription.unsubscribe(); }
  }

  private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
      return this.tags.filter(tag => tag.toLowerCase().includes(filterValue));
  }

  submit() {
      console.log(this.tagControl.value);
      this.tagService.addTag(this.tagControl.value);
      this.hideInputF();
  }

  showInputF() {
      this.showInput = true;
  }
  loadMoviePage(event) {
    event.id = event.id;
    this.router.navigate(['app/products/', event.id]);
    this.fetchProducts();
  }

  hideInputF() {
      this.showInput = false;
  }



}
