import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Comment } from '../models/comment';



@Injectable({
    providedIn: 'root',
})
export class CommentService {

    constructor(private http: HttpClient) {
    }

    putComment(comment: Comment, idAsso: number ) {
        return this.http.get(  `//hicjv3.azurewebsites.net/comment/${idAsso}/${comment}`);
    }

}