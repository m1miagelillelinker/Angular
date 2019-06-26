import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HicouchAPIService} from './hicouchAPI.service';



@Injectable({
    providedIn: 'root',
})
export class TagService {

    constructor(private api: HicouchAPIService) {
    }

    /**
     * Retrieves all tags to moderate
     * @param idProduit
     */
    getTags(idProduit: string) {
        return this.api.getTagsByProduct(idProduit);
    }

    /**
     * Submits a tag to moderation
     * @param tag
     * @param idProduit
     */
    addTag(tag: string, idProduit: string) {
        return this.api.putTagOnProduct(idProduit, tag);
    }
}
