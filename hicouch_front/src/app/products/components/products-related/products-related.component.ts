import { Component, OnInit, Input, OnChanges, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSelectModule } from '@angular/material';

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
          width: '500px',
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
})
export class ProductsRelatedAddDialog {

  constructor(
    public dialogRef: MatDialogRef<ProductsRelatedAddDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
