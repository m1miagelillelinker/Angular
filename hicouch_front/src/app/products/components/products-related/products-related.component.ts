import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(
      private router: Router,
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log(this.allProducts);
  }

  fetchList(number): any[] {
      let tab = [];
      if (number > 6) {
        tab = this.allProducts.slice(6, this.currentIndex);
        return tab;
      } else {
        tab = this.allProducts.slice(0, 6);
        return tab;
      }
  }

  fetchIndex(direction) {
    if (direction === 'right') {
        if (this.currentIndex + 6 > this.allProducts.length) {
            this.currentIndex += 6;
        } else {
            this.currentIndex = this.allProducts.length;
        }
    }
    if (direction === 'left') {
        if (this.currentIndex - 6 < 0) {
            this.currentIndex -= 6;
        } else {
            this.currentIndex = 0;
        }

    }
    console.log(this.currentIndex);
    this.fetchList(this.currentIndex);
  }

  goTo(productId) {
      this.router.navigate(['app/products', productId]);
  }

}
