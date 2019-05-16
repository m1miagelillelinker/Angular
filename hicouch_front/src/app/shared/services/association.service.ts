import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {HicouchAPIService} from './hicouchAPI.service';



@Injectable({
    providedIn: 'root',
})
export class AssociationService {

    constructor(private http: HttpClient, private api: HicouchAPIService) {
    }

    fetchtAssociationByProduct(idProduct: number) {
        return this.http.get(`http://localhost:8080/association/byProduct?idProduct=${idProduct}`);
    }

    createAssociation(idProductA: string, typeProductA: string, idProductB: string, typeProductB: string) {
        return this.api.newAssociation(idProductA, typeProductA, idProductB, typeProductB);
    }

}
