import { Component, OnInit, Input, OnChanges, Inject, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { CommentService } from '../../../shared/services/comment.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSelectModule, MatAutocompleteModule } from '@angular/material';
import { Association } from '../../../shared/models/association';
import { Comment } from '../../../shared/models/comment';
import { User } from '../../../shared/models/user';
import { AssociationService } from '../../../shared/services/association.service';
import { Product } from '../../../shared/models/product';

@Component({
    selector: 'app-products-related',
    templateUrl: './products-related.component.html',
    styleUrls: ['./products-related.component.scss'],
})
export class ProductsRelatedComponent implements OnInit, OnChanges {
    @Input() allProducts: Array<Association>;
    @Input() loggedUser: User;
    @Input() currentProduct: Product;
    @Input() filteredProducts: Array<Association>;
    @Output() filters: EventEmitter<any> = new EventEmitter();
    movieSelected = true;
    bookSelected = true;
    tvSelected = true;
    gameSelected = true;
    filtersList = [];
    currentIndex = 0;
    totalPages = 1;
    currentPage = 0;
    displayTitle: string;
    idProduct: number;
    idAssociatedProduct: number;

    showComments: boolean;
    assoComment: Association;

    constructor(
        private router: Router,
        public dialog: MatDialog,
        private changeDetectorRef: ChangeDetectorRef,
    ) { }

    ngOnInit() {
        this.filtersList.push('m');
        this.filtersList.push('t');
        this.filtersList.push('b');
        this.filtersList.push('g');
        console.log('products : ');
        console.log(this.allProducts);
    }
    // fetchList(number): Association[] {
    //     this.allProducts.forEach(asso => {
    //         asso.product.title = this.fetchTitle(asso.product.title);
    //     });
    //     if (this.allProducts) {
    //         this.allProducts.forEach(p => {
    //             if (!p.productDTO.type) { p.productDTO.type = 'movie'; }
    //         });
    //     }
    //     let tab = [];
    //     this.fetchNavigation();
    //     if (number >= 5) {
    //         tab = this.allProducts.slice(number, number + 5);
    //         console.log(tab);
    //         return tab;
    //     } else {
    //         tab = this.allProducts.slice(0, 5);
    //         console.log(tab);
    //         return tab;
    //     }
    //     // return [this.asso];
    // }

    fetchNavigation() {
        this.totalPages = Math.ceil(this.filteredProducts.length / 5);

    }

    ngOnChanges() {
        console.log(this.allProducts);
        this.changeDetectorRef.detectChanges();
    }

    fetchList(number: number): Association[] {
        if (this.allProducts) {
            this.allProducts.forEach(p => {
                if (!p.productB.type) { p.productB.type = 'movie'; }
            });
        }
        let tab = [];
        this.fetchNavigation();
        if (number >= 5) {
            tab = this.filteredProducts.slice(number, number + 5);
            return tab;
        } else {
            tab = this.filteredProducts.slice(0, 5);
            return tab;
        }
    }

    getPicto(type) {
        if (type === 'movie') {
            return '/assets/images/movie.png';
        }
        if (type === 'book') {
            return '/assets/images/book-cover.png';
        }
        if (type === 'series') {
            return '/assets/images/computer.png';
        } else {
            return '/assets/images/gamepad.png';
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
            this.currentIndex += 5;
            if (this.currentIndex >= this.allProducts.length) {
                this.currentIndex = this.allProducts.length;
            }


        }
        if (direction === 'left') {
            this.currentPage -= 1;
            this.currentIndex -= 5;
            if (this.currentIndex - 5 <= 0) {
                this.currentIndex = 0;
            }

        }
        this.fetchList(this.currentIndex);
    }

    selectType(type: string) {
        switch (type) {
            case 'movie':
                this.movieSelected = !this.movieSelected;
                // if (this.movieSelected && this.filtersList.find(l => l === 'm') == null) {
                //     this.filtersList.push('m');
                // } else {
                //     idx = this.filtersList.findIndex(l => l === 'm');
                //     this.filtersList.splice(idx, 1);
                // }
                break;
            case 'tvshow':
                this.tvSelected = !this.tvSelected;
                // if (this.tvSelected && this.filtersList.find(l => l === 't') == null) {
                //     this.filtersList.push('t');
                // } else {
                //     idx = this.filtersList.findIndex(l => l === 't');
                //     this.filtersList.splice(idx, 1);
                // }
                break;
            case 'book':
                this.bookSelected = !this.bookSelected;
                // if (this.bookSelected && this.filtersList.find(l => l === 'b') == null) {
                //     this.filtersList.push('b');
                // } else {
                //     idx = this.filtersList.findIndex(l => l === 'b');
                //     this.filtersList.splice(idx, 1);
                // }
                break;
            case 'game':
                this.gameSelected = !this.gameSelected;
                // if (this.gameSelected && this.filtersList.find(l => l === 'g') == null) {
                //     this.filtersList.push('g');
                // } else {
                //     idx = this.filtersList.findIndex(l => l === 'g');
                //     this.filtersList.splice(idx, 1);
                // }
                break;
        }
        this.filters.emit('');
        const pute = [];
        if (this.movieSelected) {
            pute.push('movie');
        }
        if (this.bookSelected) {
            pute.push('book');
        }
        if (this.tvSelected) {
            pute.push('series');
        }
        if (this.gameSelected) {
            pute.push('game');
        }
        this.filters.emit(pute);
        // this.fetchList(this.currentIndex);
        console.log(this.currentIndex);
        this.fetchList(this.currentIndex);
    }

    addAssociation() {
        this.openDialog();
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(ProductsRelatedAddDialogComponent, {
            width: '50%',
            data: { nomProduct: this.idProduct, id2: null, currentProduct: this.currentProduct }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.idAssociatedProduct = result;
        });
    }


    goTo(productId) {
        console.log('go to this product');
       // this.router.navigate(['app/products', productId]);
    }

    showPopover(asso: Association) {
        this.showComments = true;
        console.log(asso);
        console.log(this.showComments);
        this.assoComment = asso;
        if (this.showComments) {
            this.assoComment = asso;

            // TODO : be able to scroll to comments
        }
    }

}

@Component({
    selector: 'app-products-related-add-dialog',
    templateUrl: 'products-related-add-dialog.html',
    styleUrls: ['./products-related.component.scss'],
})
export class ProductsRelatedAddDialogComponent implements OnInit {
    Productstype = [
        { value: 'BOOK', viewValue: 'Livre' },
        { value: 'MOVIE', viewValue: 'Film' },
        { value: 'TVSHOW', viewValue: 'Série' },
        { value: 'VIDEOGAMES', viewValue: 'Jeu-Vidéo' }
    ];
    currentProduct;
    selectedType: string;
    products: any[];
    myControl = new FormControl();
    isMovieSearched = new EventEmitter();
    selectedOption;
    form: FormGroup;
    options = [
        { title: 'One' },
        { title: 'Two' },
        { title: 'Three' }
    ];
    listProductsFound: Observable<string[]>;

    constructor(
        public dialogRef: MatDialogRef<ProductsRelatedAddDialogComponent>,
        private productService: ProductService,
        private associationService: AssociationService,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.listProductsFound = this.myControl.valueChanges
        .pipe(
            startWith(''),
            map(value => this._filter(value))
            // map(value => this._filter(value.title))
        );
        this.form = new FormGroup({});
        this.currentProduct = this.data.currentProduct;
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
    private _filter(value: string): any[] {
        const filterValue = value.toLowerCase();
        console.log(value);
        if (this.selectedType === 'BOOK') {
            // this.options = this.productService.getBookByTitle(value);
        }
        if (this.selectedType === 'MOVIE') {
            // this.options = this.productService.getMovieByTitle(filterValue);
        }
        if (this.selectedType === 'TVSHOW') {
            // this.options = this.productService.getTVShowByTitle(filterValue);
        }
        if (this.selectedType === 'VIDEOGAMES') {
            // this.options = this.productService.getVideoGameByTitle(filterValue);
        }

        return this.options.filter(option => option.title.toLowerCase().includes(filterValue));
    }

    addAssociation() {
        console.log('Associer');
        this.associationService.createAssociation(this.currentProduct.id,
            this.currentProduct.type,
            this.selectedOption.id,
            this.selectedOption.type)
            .subscribe(res => console.log(res));
        // this.openDialog();
    }

    setSelectedOption(value): void {
        console.log('Option selected ' + value.title);
        // Si on a pu avoir "[value]="product"", ce sera setSelectedOption(id: number) avec id du product
        // this.associationService.associate(id, this.product.id);   Service à créér
    }

    displayFn(product) {
        // return product ? product.title : undefined;
        return product ? product : undefined;
    }

    toggleSearchPropositions(value) {
        value = encodeURIComponent(value.trim());
        this.productService.getMoviesByTitle(value).subscribe((movie) => {
          this.products = movie;
          this.isMovieSearched.emit(movie);
        });
      }

      onType(value: string) {
        value = encodeURIComponent(value.trim());
        this.productService.getMoviesByTitle(value).subscribe((movie) => {
          this.products = movie;
          this.isMovieSearched.emit(movie);
        });
      }

      selectProduct(event) {
        this.selectedOption = event;
        this.setSelectedOption(event);
      }

}
