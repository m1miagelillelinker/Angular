import { Component, OnInit, OnDestroy, OnChanges, Input, ChangeDetectorRef } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-product',
  templateUrl: './main-product.component.html',
  styleUrls: ['./main-product.component.scss'],
})
export class MainProductComponent implements OnInit, OnDestroy, OnChanges {
  @Input() movie: any;
  productSubscription: Subscription;


  constructor(
      private changeRefDetecter: ChangeDetectorRef,
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    console.log(changes);
    this.changeRefDetecter.detectChanges();
  }


  ngOnDestroy() {
  }
}
