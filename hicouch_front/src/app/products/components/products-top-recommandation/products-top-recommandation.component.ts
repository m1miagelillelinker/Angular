import { Component, OnInit, Input, ChangeDetectorRef, OnChanges } from '@angular/core';

@Component({
  selector: 'app-products-top-recommandation',
  templateUrl: './products-top-recommandation.component.html',
  styleUrls: ['./products-top-recommandation.component.scss'],
})
export class ProductsTopRecommandationComponent implements OnInit, OnChanges {
  @Input() productsRelated: any;
  movieSelected = true;
  bookSelected = false;
  displayTitle: string;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.selectTab('movie');
    console.log(this.productsRelated);
  }

  ngOnChanges() {
    this.changeDetectorRef.detectChanges();
    this.selectTab('');
  }

  fetchTitle(title: string) {
    if (title) {
      if (title.length > 40) {
        this.displayTitle = title.substr(0, 40) + '...';
      } else {
        this.displayTitle = title;
      }
      return this.displayTitle;
    }

  }
  fetchDesc(title: string) {
    if (title) {
      if (title.length > 140) {
        this.displayTitle = title.substr(0, 140) + '...';
      } else {
        this.displayTitle = title;
      }
      return this.displayTitle;
    }

  }

  selectTab(tab: string) {
    this.productsRelated.forEach(p => {
      p.product.titleShort = this.fetchTitle(p.product.title);
      p.product.descShort = this.fetchDesc(p.product.description);
      if (!p.product.type) {
        p.product.type = 'movie';
      }
    });
    if (tab === 'movie') {
      this.movieSelected = true;
      this.bookSelected = false;
    } else {
      this.bookSelected = true;
      this.movieSelected = false;
    }
  }

}
