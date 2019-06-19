import { Component, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '../../models/user';
import { ProductResult, Product } from '../../models/product';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss'],
})
export class SearchProductComponent {

  maximumCharacters = 250;
  form: FormGroup;
  inputIsFocused = false;
  @Output() searchValue = new EventEmitter();
  @Output() productSelected = new EventEmitter();
  @Output() filterSelected = new EventEmitter();
  @Input() productList: any[];
  @Input() selectedOption: Product;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterInput') filterInput: ElementRef;
  productType: any;


  selectProduct(product: Product): void {
    const newUser = {
      id: product.id,
      type: product.type,
      title: product.title,
      image: product.image,
    };
    this.productSelected.emit(newUser);
    this.searchInput.nativeElement.value = product.title;
    this.productList = [];
  }

  onFocus(): void {
    this.inputIsFocused = true;
  }

  onBlur(): void {
    this.inputIsFocused = false;
  }

  onType(value): void {
    if (value.length >= 3) {
      this.searchValue.emit(value);
    }
    if (value.length === 0) {
      this.productList = null;
    }
  }

  search(value): void {
    if (value.length >= 3) {
      this.searchValue.emit(value);
      this.searchInput.nativeElement.value = '';
      this.productList = null;
    }
  }

  chooseFilter(event) {
    this.productType = event.target.value;
    this.filterSelected.emit(this.productType);
  }

}
