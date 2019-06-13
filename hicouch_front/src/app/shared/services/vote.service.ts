import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vote } from '../models/vote';



@Injectable({
    providedIn: 'root',
})
export class VoteService {

    constructor(private http: HttpClient) {
    }

    getVoteByUserId(userid: string) {
        return this.http.get<Vote>(`//localhost:8080/vote/userVote?userId=${userid}`);
    }

    getVoteByAssoId(assoId: number) {
        return this.http.get<Vote>(`//localhost:8080/vote/AssoVote?assoId=${assoId}`);
    }

    vote(vote: Vote) {
        return this.http.put<Vote>(  `//localhost:8080/vote/vote/`, vote);
    }

    unvote(vote: Vote) {
        return this.http.put<Vote>(  `//localhost:8080/vote/unvote/`, vote);
    }

}
