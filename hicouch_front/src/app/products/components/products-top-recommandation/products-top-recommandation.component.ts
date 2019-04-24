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
  displayTitle: string;

  constructor(
  ) { }

  ngOnInit() {
    this.selectTab('movie');
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
        p.titleShort = this.fetchTitle(p.title);
        p.descShort = this.fetchDesc(p.description);
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
