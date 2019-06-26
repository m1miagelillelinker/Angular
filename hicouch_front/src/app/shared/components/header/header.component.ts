import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import {AuthenticationService} from '../../services/authentification.service';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() user: User;
  userSelected = new EventEmitter();
  @Output() isMovieSearched = new EventEmitter();
  products: any;
  type: any;
  inputValue: any;

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private router: Router,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.userService.getCurrentUser().subscribe((u: User) => this.user = u);
    }
  }

  goToUser() {
    this.router.navigate(['app/account', this.user.id]);
  }

  goToHomePage() {
    this.router.navigate(['app/home']);
  }

  onType(value: string) {
    value = value.replace(' ', '+');
    this.productService.getMoviesByTitle(value).subscribe((movie) => {
      this.products = movie;
      // this.isMovieSearched.emit(movie);
    });
  }

  toggleSearchPropositions(value) {
    this.inputValue = '';
    value = value.replace(' ', '+');
    this.productService.getProductByTypeAndTitle(value, this.type).subscribe((movie) => {
      this.products = movie;
      // this.isMovieSearched.emit(movie);
    });
  }

  goToProduct(event) {
    this.isMovieSearched.emit(event);
    this.router.navigate(['app/products', event.type, event.id]);
  }

  setFilter(event) {
    this.type = event;
  }

  disconnect() {
    this.auth.logout();
  }

  goToModo() {
    this.router.navigate(['app/moderation']);
  }

}
