import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
    providedIn: 'root',
})
export class AssociationService {

    constructor(private http: HttpClient) {
    }

    fetchtAssociationByProduct(idProduct: number) {
        return this.http.get(`https://hicjv2.azurewebsites.net/association/byProduct?idProduct=${idProduct}`);
    }

    createAssociation(idProductA: string, typeProductA: String, idProductB: string, typeProductB: String) {
        return this.http.get('https://hicjv2.azurewebsites.net/association/create' +
            '?idProductA=${idProductA}&idfournA=${typeProductA}&idProductB=${idProductB}&idfournB=${typeProductB}');
    }

}
