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

  constructor(
    private userService: UserService,
    private router: Router,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.userService.getUser('2').subscribe(
      (user: User) => {
        console.log(user);
        this.user = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
        };
        this.userSelected.emit(this.user);
      });

    // TODO : DEMOCK !
    // this.user = {
    //   id: 1,
    //   firstName: 'Mocked',
    //   lastName: 'User'
    // };
  }

  goToUser() {
    this.router.navigate(['app/account', this.user.id]);
  }

  onType(value: string) {
    this.productService.getMovieByTitle(value).subscribe((movie) => {
      this.isMovieSearched.emit(movie);
    });
  }

}
