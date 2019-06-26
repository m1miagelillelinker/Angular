import { Component, OnInit, OnDestroy, OnChanges, Input, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { TagService } from '../../../shared/services/tag.service';
import { Product } from '../../../shared/models/product';
import { Tag } from '../../../shared/models/tag';

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
  displayTitle: string;



  constructor(
    private changeRefDetecter: ChangeDetectorRef,
    private tagService: TagService,
  ) { }

  ngOnInit() {
    this.mainProduct.descShort = this.fetchDesc(this.mainProduct.description);
  }

  ngOnChanges(changes) {
    this.changeRefDetecter.detectChanges();
  }


  ngOnDestroy() {
  }

  /**
   * Submits a proposed tag to moderation
   */
  submit() {
    const t = this.tagInput.nativeElement;
    this.tagService.addTag(t.value, this.mainProduct.id)
      .subscribe();
    this.setInputFVisibility(false);
    this.displayConfirmation = true;
  }

  /**
   * Manage the visibility of the input to add a tag
   * @param visible
   */
  setInputFVisibility(visible: boolean) {
    this.showInput = visible;
    this.displayConfirmation = !visible;
  }

  /**
   * Reduces the description if it is too long (140 characters)
   * @param title
   */
  fetchDesc(title: string) {
    if (title) {
      if (title.length > 140) {
        this.displayTitle = title.substr(0, 400) + '...';
      } else {
        this.displayTitle = title;
      }
      return this.displayTitle;
    }

  }
}
