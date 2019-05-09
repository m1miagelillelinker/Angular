import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Movie, Book, Product } from '../models/product';



@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getMovieById(idMovie: string) {
    return this.http.get(`https://hicjv2.azurewebsites.net/product/getFilmByIdFromReferentiel?filmId=${idMovie}`);
  }

  getBookById(idBook: string) {
    return this.http.get(`https://hicjv2.azurewebsites.net/product/getBookByIdFromReferentiel?bookId=${idBook}`);
  }

  getMovieByTitle(title: string): any {
    return this.http.get(`https://hicjv2.azurewebsites.net/product/getFilmByTitleFromReferentiel?title=${title}`);
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
    // return this.http.get<User>(`https://hicjv2.azurewebsites.net/user/get?userId=${prod}`);
  }
  getMovie() {
      return this.getMovieById('tt0120737');
    // return this.http.get<User>(`https://hicjv2.azurewebsites.net/user/get?userId=${prod}`);
  }

}
