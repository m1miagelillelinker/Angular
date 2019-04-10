import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Movie, Book } from '../models/product';



@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getMovieById(idMovie: string) {
    return this.http.get(`//localhost:8080/product/getFilmByIdFromReferentiel?filmId=${idMovie}`);
  }

  getBookById(idBook: string) {
    return this.http.get(`//localhost:8080/product/getBookByIdFromReferentiel?bookId=${idBook}`);
  }

  getBook() {
    const book: Book = {
      id: '1',
      title: 'Harry Potter à l école des sorciers',
      description: 'Harry est un sorcier',
      author: 'J.K. Rowling',
      year: '2003',
      genre: 'Fantastic',
      // tslint:disable-next-line:max-line-length
      image: 'http://books.google.fr/books?id=nvijsUyJYR4C&printsec=frontcover&dq=Harry+Potter&hl=&cd=1&source=gbs_api',
      type: 'book',
    };
    return book;
    // return this.http.get<User>(`//localhost:8080/user/get?userId=${prod}`);
  }
  getMovie() {
      return this.getMovieById('tt0120737');
    // return this.http.get<User>(`//localhost:8080/user/get?userId=${prod}`);
  }
}
