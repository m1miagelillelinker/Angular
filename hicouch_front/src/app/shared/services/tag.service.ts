import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
    providedIn: 'root',
})
export class TagService {

    constructor(private http: HttpClient) {
    }

    getTags(id: string) : string[]{
        return ; // this.http.get(`//localhost:8080/product/getFilmByIdFromReferentiel?filmId=${idMovie}`);
    }

    addTag(id: string, tag: string) {
        return ;
    }
}
