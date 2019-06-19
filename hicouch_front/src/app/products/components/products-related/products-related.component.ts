import { Component, OnInit, Input, OnChanges, Inject, ChangeDetectorRef, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
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
    totalPages = null;
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
        this.fetchList(0);
        this.showComments = false;
    }


    fetchNavigation() {
        this.totalPages = Math.ceil(this.filteredProducts.length / 5);

    }

    ngOnChanges() {
        this.fetchList(0);
        this.showComments = false;
    }

    fetchList(number: number): Association[] {
        if (this.allProducts) {
            this.allProducts.forEach(p => {
                if (!p.productB.type) { p.productB.type = 'film'; }
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
        if (type === 'film') {
            return '/assets/images/movie.png';
        }
        if (type === 'book') {
            return '/assets/images/book-cover.png';
        }
        if (type === 'serie') {
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
            case 'film':
                this.movieSelected = !this.movieSelected;
                break;
            case 'serie':
                this.tvSelected = !this.tvSelected;
                break;
            case 'book':
                this.bookSelected = !this.bookSelected;
                break;
            case 'game':
                this.gameSelected = !this.gameSelected;
                break;
        }
        this.filters.emit('');
        const filtersList = [];
        if (this.movieSelected) {
            filtersList.push('film');
        }
        if (this.bookSelected) {
            filtersList.push('book');
        }
        if (this.tvSelected) {
            filtersList.push('serie');
        }
        if (this.gameSelected) {
            filtersList.push('game');
        }
        this.filters.emit(filtersList);
        this.fetchList(this.currentIndex);
    }

    addAssociation() {
        this.openDialog();
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(ProductsRelatedAddDialogComponent, {
            width: '70%',
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
        { value: 'book', viewValue: 'Livre' },
        { value: 'film', viewValue: 'Film' },
        { value: 'serie', viewValue: 'Série' },
        { value: 'game', viewValue: 'Jeu-Vidéo' }
    ];
    currentProduct;
    selectedType: string;
    products: any[];
    myControl = new FormControl();
    isMovieSearched = new EventEmitter();
    selectedOption;
    form: FormGroup;
    type: any;
    @ViewChild('commentInput') commentInput: ElementRef;
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
        private commentService: CommentService,
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

    setFilter(event) {
        this.type = event;
      }
    private _filter(value: string): any[] {
        const filterValue = value.toLowerCase();
        console.log(value);
        if (this.selectedType === 'book') {
            // this.options = this.productService.getBookByTitle(value);
        }
        if (this.selectedType === 'film') {
            // this.options = this.productService.getMovieByTitle(filterValue);
        }
        if (this.selectedType === 'serie') {
            // this.options = this.productService.getTVShowByTitle(filterValue);
        }
        if (this.selectedType === 'game') {
            // this.options = this.productService.getVideoGameByTitle(filterValue);
        }

        return this.options.filter(option => option.title.toLowerCase().includes(filterValue));
    }

    addAssociation() {
        this.associationService.createAssociation(this.currentProduct.id,
            this.currentProduct.type,
            this.selectedOption.id,
            this.selectedOption.type)
            .subscribe(res => {
                const idPair = res.idPair;
                const comment = this.commentInput.nativeElement.value;
                this.commentService.putComment(comment, idPair).subscribe();
            });
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
        this.productService.getProductByTypeAndTitle(value, this.type).subscribe((movie) => {
          console.log(movie);
          this.products = movie;
          // this.isMovieSearched.emit(movie);
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
