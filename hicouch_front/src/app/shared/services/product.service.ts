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

  getProductByTypeAndId(idProduct: string, typeProduct: string): any {
    switch (typeProduct) {
      case 'film':
        return this.getMovieById(idProduct);
      case 'book':
        return this.getBookById(idProduct);
      case 'game':
        return this.getGameById(idProduct);
      default:
        return this.getMovieById(idProduct);
    }
  }

  getProductByTypeAndTitle(title: string, typeProduct: string): any {
    switch (typeProduct) {
      case 'film':
        return this.getMoviesByTitle(title);
      case 'book':
        return this.getBooksByTitle(title);
      case 'game':
        return this.getGamesByTitle(title);
      default:
        return this.getMoviesByTitle(title);
    }
  }

  /**
   * Gets a product of type movie by his id
   * @param idMovie
   */
  getMovieById(idMovie: string) {
    return this.api.getFilmByID(idMovie);
  }

  /**
   * Gets a product of type book by his id
   * @param idBook
   */
  getBookById(idBook: string) {
    return this.api.getBookByID(idBook);
  }

  /**
   * Gets a product of type game by his id
   * @param idGame
   */
  getGameById(idGame: string) {
    return this.api.getGameByID(idGame);
  }

  /**
   * Search a movie corresponding to this title
   * @param title
   */
  getMoviesByTitle(title: string): any {
    return this.api.searchFilm(title);
  }

  /**
   * Search a book corresponding to this title
   * @param title
   */
  getBooksByTitle(title: string): any {
    return this.api.searchBook(title);
  }

  /**
   * Search a game corresponding to this title
   * @param title
   */
  getGamesByTitle(title: string): any {
    return this.api.searchGame(title);
  }


}
