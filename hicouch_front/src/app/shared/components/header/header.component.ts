import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

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

  constructor(
    private userService: UserService,
    private router: Router,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.userService.getUser('1').subscribe(
      (user: User) => {
        this.user = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
        };
        this.userSelected.emit(this.user);
      });
  }

  goToUser() {
    this.router.navigate(['app/account', this.user.id]);
  }

  goToHomePage() {
    this.router.navigate(['app/home']);
  }

  onType(value: string) {
    value = encodeURIComponent(value.trim());
    this.productService.getMoviesByTitle(value).subscribe((movie) => {
      this.products = movie;
      this.isMovieSearched.emit(movie);
    });
  }

  toggleSearchPropositions(value) {
    value = encodeURIComponent(value.trim());
    this.productService.getMoviesByTitle(value).subscribe((movie) => {
      this.products = movie;
      this.isMovieSearched.emit(movie);
    });
  }

  goToProduct(event) {
    this.router.navigate(['app/products', event.id]);
  }

}
