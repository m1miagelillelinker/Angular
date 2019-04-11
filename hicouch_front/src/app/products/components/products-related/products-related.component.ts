import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-products-related',
  templateUrl: './products-related.component.html',
  styleUrls: ['./products-related.component.scss'],
})
export class ProductsRelatedComponent implements OnInit {
  @Input() allProducts: any;
  movieSelected = true;
  bookSelected = false;
  currentIndex = 0;

  constructor(
  ) { }

  ngOnInit() {
  }

  fetchList(number): any[] {
      let tab = [];
      if (number > 5) {
        tab = this.allProducts.slice(5, this.currentIndex);
        return tab;
      } else {
        tab = this.allProducts.slice(0, 5);
        return tab;
      }

  }

  fetchIndex(direction) {
    if (direction === 'right') {
        if (this.currentIndex + 5 > this.allProducts.length) {
            this.currentIndex += 5;
        } else {
            this.currentIndex = this.allProducts.length;
        }
    }
    if (direction === 'left') {
        if (this.currentIndex - 5 > 0) {
            this.currentIndex -= 5;
        } else {
            this.currentIndex = 0;
        }

    }
  }

}
