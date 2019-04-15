import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-products-top-recommandation',
  templateUrl: './products-top-recommandation.component.html',
  styleUrls: ['./products-top-recommandation.component.scss'],
})
export class ProductsTopRecommandationComponent implements OnInit {
  @Input() productsRelated: any;
  movieSelected = true;
  bookSelected = false;

  constructor(
  ) { }

  ngOnInit() {
    console.log(this.productsRelated);
  }



  selectTab(tab: string) {
    if (tab === 'movie') {
      this.movieSelected = true;
      this.bookSelected = false;
    } else {
      this.bookSelected = true;
      this.movieSelected = false;
    }
  }

}
