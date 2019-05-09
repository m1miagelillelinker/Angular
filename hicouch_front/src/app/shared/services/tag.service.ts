import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';



@Injectable({
    providedIn: 'root',
})
export class TagService {

    constructor(private http: HttpClient) {
    }

    getTags(idProduit: string) {
        return this.http.get(`http://localhost:8080/tag/byProduct?idProduit=${idProduit}`);
    }

    addTag(tag: string, idProduit: string) {
        headers.append('Content-Type', 'application/json');
        return this.http.put(`http://localhost:8080/tag/tagOnProduct?idProduit=${idProduit}&tag=${tag}`, {});
    }
}
