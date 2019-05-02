import { Component, OnInit, Input, OnChanges, Inject } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSelectModule, MatAutocompleteModule } from '@angular/material';

export interface DialogData {
  nomProduct: string;
}

@Component({
  selector: 'app-products-related',
  templateUrl: './products-related.component.html',
  styleUrls: ['./products-related.component.scss'],
})
export class ProductsRelatedComponent implements OnInit, OnChanges {
  @Input() allProducts: any;
  movieSelected = true;
  bookSelected = false;
  currentIndex = 0;
  totalPages: number;
  currentPage = 0;
  displayTitle: string;
  idProduct: number;
  idAssociatedProduct: number;

  constructor(
      private router: Router,
      public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  fetchNavigation() {
      this.totalPages = Math.ceil(this.allProducts.length / 5);
  }

  ngOnChanges() {
  }

  fetchList(number): any[] {
    this.allProducts.forEach(p => {
        p.titleShort = this.fetchTitle(p.title);
    });
      let tab = [];
      this.fetchNavigation();
      if (number > 5) {
        tab = this.allProducts.slice(5, this.currentIndex);
        return tab;
      } else {
        tab = this.allProducts.slice(0, 5);
        return tab;
      }


  }

  getPicto(type) {
    if (type === 'movie') {
        return '/assets/images/movie.png';
    }
    if (type === 'book') {
        return '/assets/images/book-cover.png';
    } else {
        return '/assets/images/computer.png';
    }
  }

  getTitle(product) {
      return product.title;
  }

  fetchTitle(title: string) {
      if (title) {
        if (title.length > 17) {
            this.displayTitle = title.substr(0, 17) + '...';
        } else {
            this.displayTitle = title;
        }
        return this.displayTitle;
      }

  }

  counter(i: number) {
    return new Array(i);
}

  fetchIndex(direction) {
    if (direction === 'right') {
        this.currentPage += 1;
        if (this.currentIndex + 5 > this.allProducts.length) {
            this.currentIndex += 5;
        } else {
            this.currentIndex = this.allProducts.length;
        }
    }
    if (direction === 'left') {
        this.currentPage -= 1;
        if (this.currentIndex - 5 < 0) {
            this.currentIndex -= 5;
        } else {
            this.currentIndex = 0;
        }

    }
    this.fetchList(this.currentIndex);
  }

  addAssociation() {
      this.openDialog();
  }

  openDialog(): void {
      const dialogRef = this.dialog.open(ProductsRelatedAddDialog, {
          width: '50%',
          data: { nomProduct: this.idProduct, id2: null }
      });

      dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.idAssociatedProduct = result;
      });
  }


  goTo(productId) {
      this.router.navigate(['app/products', productId]);
  }

}

@Component({
  selector: 'products-related-add-dialog',
  templateUrl: 'products-related-add-dialog.html',
    styleUrls: ['./products-related.component.scss'],
})
export class ProductsRelatedAddDialog {
    Productstype = [
        {value: 'BOOK', viewValue: 'Livre'},
        {value: 'MOVIE', viewValue: 'Film'},
        {value: 'TVSHOW', viewValue: 'Série'},
        {value: 'VIDEOGAMES', viewValue: 'Jeu-Vidéo'}
    ];
    selectedType: string;
    myControl = new FormControl();
    selectedOption;
    options = [
        {title: 'One'},
        {title: 'Two'},
        {title: 'Three'}
        //'One', 'Two', 'Three'
        ];
    listProductsFound: Observable<string[]>;

  constructor(
    public dialogRef: MatDialogRef<ProductsRelatedAddDialog>,
    private productService: ProductService,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  /*searchProducts(value : string): void {
      if(value.length > 2){
          console.log(value);
          if(this.selectedType == 'BOOK'){
              // this.options = this.productService.getMovieByTitle(value);
              console.log('Vous recherchez un livre');
          }
          if(this.selectedType == 'MOVIE'){
              console.log('Vous recherchez un film');
          }
          if(this.selectedType == 'TVSHOW'){
              console.log('Vous recherchez une série');
          }
          if(this.selectedType == 'VIDEOGAMES'){
              console.log('Vous recherchez un jeu vidéo');
          }
      }
  }*/

    ngOnInit() {
        this.listProductsFound = this.myControl.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
                //map(value => this._filter(value.title))
            );
    }

    private _filter(value: string): any[] {
        const filterValue = value.toLowerCase();
        console.log(value);
        if (this.selectedType == 'BOOK') {
            // this.options = this.productService.getBookByTitle(value);
            console.log('Vous recherchez un livre');
        }
        if (this.selectedType == 'MOVIE') {
            // this.options = this.productService.getMovieByTitle(filterValue);
            console.log('Vous recherchez un film');
        }
        if (this.selectedType == 'TVSHOW') {
            // this.options = this.productService.getTVShowByTitle(filterValue);
            console.log('Vous recherchez une série');
        }
        if (this.selectedType == 'VIDEOGAMES') {
            // this.options = this.productService.getVideoGameByTitle(filterValue);
            console.log('Vous recherchez un jeu vidéo');
        }
        
        return this.options.filter(option => option.title.toLowerCase().includes(filterValue));
    }
    
    addAssociation() {
        console.log("Associer");
        //this.openDialog();
    }
    
    setSelectedOption(value: string): void {
        console.log("Option selected " + value);
        // Si on a pu avoir "[value]="product"", ce sera setSelectedOption(id: number) avec id du product
        //this.associationService.associate(id, this.product.id);   Service à créér 
    }
    
    displayFn(product) {
        // return product ? product.title : undefined;
        return product ? product : undefined;
    }

}
