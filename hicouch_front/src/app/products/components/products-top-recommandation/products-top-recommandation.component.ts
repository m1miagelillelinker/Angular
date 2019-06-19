import { Component, OnInit, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProductsRelatedAddDialogComponent } from '../products-related/products-related.component';

@Component({
  selector: 'app-products-top-recommandation',
  templateUrl: './products-top-recommandation.component.html',
  styleUrls: ['./products-top-recommandation.component.scss'],
})
export class ProductsTopRecommandationComponent implements OnInit, OnChanges {
  @Input() productsRelated: any;
  @Input() mainProduct: any;
  movieSelected = true;
  bookSelected = false;
  serieSelected = false;
  gameSelected = false;
  containsMovie = false;
  containsSerie = false;
  containsBook = false;
  containsGame = false;
  displayTitle: string;
  idAssociatedProduct: any;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.selectTab('film');
    this.fetchContent();
  }

  ngOnChanges() {
    this.changeDetectorRef.detectChanges();
    this.containsMovie = false;
    this.containsSerie = false;
    this.containsBook = false;
    this.containsGame = false;
    this.selectTab('');
    this.fetchContent();

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

  fetchContent() {
    this.productsRelated.forEach(p => {
      console.log(p);
      p.productB.titleShort = this.fetchTitle(p.productB.title);
      p.productB.descShort = this.fetchDesc(p.productB.description);
      if (!p.productB.type) {
        p.productB.type = 'film';
      }
      if (p.productB.type === 'film') {
        this.containsMovie = true;
      }
      if (p.productB.type === 'serie') {
        this.containsSerie = true;
      }
      if (p.productB.type === 'book') {
        this.containsBook = true;
      }
      if (p.productB.type === 'game') {
        this.containsGame = true;
      }
    });
  }

  selectTab(tab: string) {

    switch (tab) {
      case 'film':
        this.movieSelected = true;
        this.bookSelected = false;
        this.serieSelected = false;
        this.gameSelected = false;
        break;
      case 'serie':
        this.movieSelected = false;
        this.bookSelected = false;
        this.serieSelected = true;
        this.gameSelected = false;
        break;
      case 'book':
        this.movieSelected = false;
        this.bookSelected = true;
        this.serieSelected = false;
        this.gameSelected = false;
        break;
      case 'game':
        this.movieSelected = false;
        this.bookSelected = false;
        this.serieSelected = false;
        this.gameSelected = true;
        break;
    }
  }
  addProduct() {
    const dialogRef = this.dialog.open(ProductsRelatedAddDialogComponent, {
      width: '70%',
      data: { nomProduct: '', id2: null, currentProduct: this.mainProduct }
    });

    dialogRef.afterClosed().subscribe(result => {
        this.idAssociatedProduct = result;
    });
  }
}
