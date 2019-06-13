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

  constructor(private api: HicouchAPIService) {
  }

  getMovieById(idMovie: string) {
    return this.api.getFilmByID(idMovie);
  }

  getBookById(idBook: string) {
    return this.api.getBookByID(idBook);
  }

  getGameById(idGame: string) {
    return this.api.getGameByID(idGame);
  }

  getMoviesByTitle(title: string): any {
    return this.api.searchFilm(title);
  }

  getBooksByTitle(title: string): any {
    return this.api.searchBook(title);
  }

  getGamesByTitle(title: string): any {
    return this.api.searchGame(title);
  }


}
