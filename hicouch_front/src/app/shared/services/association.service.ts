import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
    providedIn: 'root',
})
export class AssociationService {

    constructor(private http: HttpClient) {
    }

    fetchtAssociationByProduct(idProduct: number) {
        return this.http.get(`//localhost:8080/association/byProduct?idProduct=${idProduct}`);
    }

    createAssociation(idProductA: string, typeProductA: String, idProductB: string, typeProductB: String) {
        return this.http.get('//localhost:8080/association/create' +
            '?idProductA=${idProductA}&idfournA=${typeProductA}&idProductB=${idProductB}&idfournB=${typeProductB}');
    }

}