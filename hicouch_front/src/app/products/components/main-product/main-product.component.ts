import { Component, OnInit, OnDestroy, OnChanges, Input, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { TagService } from '../../../shared/services/tag.service';
import {Product} from '../../../shared/models/product';
import {Tag} from '../../../shared/models/tag';

@Component({
  selector: 'app-main-product',
  templateUrl: './main-product.component.html',
  styleUrls: ['./main-product.component.scss'],
})
export class MainProductComponent implements OnInit, OnDestroy, OnChanges {
  @Input() mainProduct: Product;
  tagControl = new FormControl();
    @Input() tags: Tag[];
    @ViewChild('tagInput') tagInput: ElementRef;
    filteredTags: Observable<Tag[]>;
    showInput = false;
  productSubscription: Subscription;
  displayConfirmation = false;


  constructor(
      private changeRefDetecter: ChangeDetectorRef,
      private tagService: TagService,
  ) { }

  ngOnInit() {
    this.tagService.getTags(this.mainProduct.id).subscribe(res => {
      this.tags = res;
      this.filteredTags = res;
    });
  }

  ngOnChanges(changes) {
    this.changeRefDetecter.detectChanges();
  }


  ngOnDestroy() {
  }

submit() {
  const t = this.tagInput.nativeElement;
    this.tagService.addTag(t.value, this.mainProduct.id)
        .subscribe(() => this.tagService.getTags(this.mainProduct.id).subscribe((json: any) => this.tags = json));
    this.setInputFVisibility(false);
    this.displayConfirmation = true;
}

setInputFVisibility(visible: boolean) {
    this.showInput = visible;
    this.displayConfirmation = !visible;
}
}
