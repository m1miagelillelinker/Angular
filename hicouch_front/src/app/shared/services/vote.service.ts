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

    /**
     * Gets vote for an user
     * @param userid
     */
    getVoteByUserId(userid: number) {
        return this.api.getVoteByUser(userid);
    }

    /**
     * Get vote for an asso
     * @param assoId
     */
    getVoteByAssoId(assoId: number) {
        return this.api.getVoteByAsso(assoId);
    }

    /**
     * Increases vote
     * @param vote
     */
    vote(vote: Vote) {
        return this.api.putVote(vote);
    }

    /**
     * Decreases vote
     * @param vote
     */
    unvote(vote: Vote) {
        return this.http.put<Vote>(  `//hicjv8.azurewebsites.net/vote/unvote/`, vote);
    }

}
