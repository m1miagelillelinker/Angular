import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';



@Injectable({
    providedIn: 'root',
})
export class TagService {

    constructor(private http: HttpClient) {
    }

    getTags(idProduit: string) {
        return this.http.get(`https://localhost:8080/tag/byProduct?idProduit=${idProduit}`);
    }

    addTag(tag: string, idProduit: string) {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.put(`https://localhost:8080/tag/tagOnProduct?idProduit=${idProduit}&tag=${tag}`, {});
    }
}
