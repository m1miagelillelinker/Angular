import { Component, OnInit, OnDestroy, OnChanges, Input, ChangeDetectorRef } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { TagService } from '../../../shared/services/tag.service';

@Component({
  selector: 'app-main-product',
  templateUrl: './main-product.component.html',
  styleUrls: ['./main-product.component.scss'],
})
export class MainProductComponent implements OnInit, OnDestroy, OnChanges {
  @Input() mainProduct: any;
  tagControl = new FormControl();
    @Input() tags: any[];
    filteredTags: Observable<string[]>;
    showInput = false;
  productSubscription: Subscription;
  displayConfirmation = false;


  constructor(
      private changeRefDetecter: ChangeDetectorRef,
      private tagService: TagService,
  ) { }

  ngOnInit() {
    this.tagService.getTags(this.mainProduct.id).subscribe(res => console.log(res));
  }

  ngOnChanges(changes) {
    this.changeRefDetecter.detectChanges();
  }


  ngOnDestroy() {
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.tags.filter(tag => tag.toLowerCase().includes(filterValue));
}

submit() {
    this.tagService.addTag(this.tagControl.value, this.mainProduct.id)
        .subscribe(() => this.tagService.getTags(this.mainProduct.id).subscribe((json: any) => this.tags = json));
    this.setInputFVisibility(false);
    this.displayConfirmation = true;
}

setInputFVisibility(visible: boolean) {
    this.showInput = visible;
    this.displayConfirmation = !visible;
}
}
