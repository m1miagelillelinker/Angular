import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Movie, Book, Product } from '../models/product';
import {HicouchAPIService} from './hicouchAPI.service';



@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient, private api: HicouchAPIService) {
  }

  getMovieById(idMovie: string) {
    return this.api.getFilmByID(idMovie);
  }

  getBookById(idBook: string) {
    return this.api.getBookyID(idBook);
  }

  getMoviesByTitle(title: string): any {
    return this.api.searchFilm(title);
  }

  getBook(): Product {
    const book: Product = {
      id: 1,
      country: 'FR',
      title: 'Harry Potter à l\'école des sorciers',
      description: 'Harry est un sorcier',
      director: 'J.K. Rowling',
      year: '2003',
      // tslint:disable-next-line:max-line-length
      image: 'assets/images/Harry-Potter-a-l-ecole-des-sorciers.jpg',
      type: 'book',
    };
    return book;
    // return this.http.get<User>(`//hicjv5.azurewebsites.net/user/get?userId=${prod}`);
  }
}
