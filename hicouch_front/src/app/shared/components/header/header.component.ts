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

    /*
    this.userService.getUser(1).subscribe(
      (user: User) => {
        this.user = {
          id: user.id,
          pseudo: user.pseudo,
          score: user.score,
          firstName: user.firstName,
          lastName: user.lastName,
          idToken: '',
          accessToken: '',
          expiresAt: 0,
        };
        this.userSelected.emit(this.user);
      });*/
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
      // this.isMovieSearched.emit(movie);
    });
  }

  toggleSearchPropositions(value) {
    value = encodeURIComponent(value.trim());
    this.productService.getMoviesByTitle(value).subscribe((movie) => {
      this.products = movie;
      // this.isMovieSearched.emit(movie);
    });
  }

  goToProduct(event) {
    console.log(event);
    this.isMovieSearched.emit(event);
    this.router.navigate(['app/products', event.type, event.id]);
  }

  disconnect() {
    this.auth.logout();
  }

}
