import { Component, OnInit, OnDestroy, ChangeDetectorRef, OnChanges } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { Product } from '../shared/models/product';
import { ActivatedRoute, Router } from '@angular/router';
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
        this.filteredProducts = this.allProducts;
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

  filterList(event: string) {
    if (event !== '') {
      // console.log(event);
      // this.allProducts.filter(p => console.log(p));
      this.filteredProducts = this.allProducts.filter(asso => asso.product.type.toLowerCase() === event);
    }
  }

}
