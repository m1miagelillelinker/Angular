import { Injectable } from '@angular/core';
import {HicouchAPIService} from './hicouchAPI.service';
import {Association} from '../models/association';


@Injectable({
    providedIn: 'root',
})
export class AssociationService {

    constructor(private api: HicouchAPIService) {
    }

    fetchtAssociationByProduct(idProduct: string) {
        return this.api.getAssociationByProduct(idProduct);
    }

    createAssociation(idProductA: string, typeProductA: string, idProductB: string, typeProductB: string) {
        return this.api.newAssociation(idProductA, typeProductA, idProductB, typeProductB);
    }

    getLastAssociations() { // Observable<Association>[]
        return this.api.lastAssociations();
    }
}
