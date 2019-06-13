import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';



@Injectable({
    providedIn: 'root',
})
export class CommentService {

    constructor(private http: HttpClient) {
    }

    putComment(comment: Comment, idAsso: number ) {
        return this.http.put(  `//hicjv4.azurewebsites.net/comment/comment/${idAsso}/`, comment);
    }

}
