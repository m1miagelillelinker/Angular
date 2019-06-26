import { Injectable } from '@angular/core';
import {HicouchAPIService} from './hicouchAPI.service';
import {Association} from '../models/association';


@Injectable({
    providedIn: 'root',
})
export class AssociationService {

    constructor(private api: HicouchAPIService) {
    }

    /**
     * Retrieves the associations of a product
     * @param idProduct
     */
    fetchtAssociationByProduct(idProduct: string) {
        return this.api.getAssociationByProduct(idProduct);
    }

    /**
     * Save an association in database
     * @param idProductA the id of the first product
     * @param typeProductA the type of the first product
     * @param idProductB the id of the second product
     * @param typeProductB the type of the second product
     */
    createAssociation(idProductA: string, typeProductA: string, idProductB: string, typeProductB: string) {
        return this.api.newAssociation(idProductA, typeProductA, idProductB, typeProductB);
    }

    /**
     * Get the latest associations made
     */
    getLastAssociations() { // Observable<Association>[]
        return this.api.lastAssociations();
    }
}
