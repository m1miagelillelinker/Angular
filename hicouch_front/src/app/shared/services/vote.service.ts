import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vote } from '../models/vote';
import {HicouchAPIService} from './hicouchAPI.service';



@Injectable({
    providedIn: 'root',
})
export class VoteService {

    constructor(private http: HttpClient, private api: HicouchAPIService) {
    }

    // getVoteByUserId(userid: number) {
    //     return this.api.getVoteByUser(userid);
    // }

    // getVoteByAssoId(assoId: number) {
    //     return this.api.getVoteByAsso(assoId);
    // }

    vote(vote: Vote) {
        return this.api.putVote(vote);
    }

    unvote(vote: Vote) {
        return this.http.put<Vote>(  `//hicjv8.azurewebsites.net/vote/unvote/`, vote);
    }

}
