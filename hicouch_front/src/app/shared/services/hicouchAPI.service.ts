import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class HicouchAPIService {

    private DOMAIN = 'http://hicjv5.azurewebsites.net';

    private tagController = '/tag';
    private abonnementController = '/abonnement';
    private signalementController = '/signalement';
    private associationController = '/association';
    private userController = '/user';
    private productController = '/product';
    private commentController = '/comment';
    private voteController = '/vote';

    constructor(private http: HttpClient) {
    }

    /**
     * Returns the complete URL based on the domain, the endpoint and the parameters list.
     * @param endPoint the endpoint to call
     * @param params the parameters to add to the url
     */
    private getBuiltUrl(endPoint: string, params: {key: any, value: any}[]): any {
        let paramString = '?';
        // add each param to paramString, and '&' between params (not after the last one)
        params.map((p: any) => paramString += (p.key + '=' + p.value + (params.indexOf(p) === params.length ? '&' : '')));
        // build complete URL with domain, controller and '?' + params if present
        return this.DOMAIN + endPoint + (paramString !== '?' ? paramString : '');
    }

    private get(endPoint: string, params: {key: any, value: any}[]): any {
        return this.http.get(this.getBuiltUrl(endPoint, params));
    }

    private put(endPoint: string, params: {key: any, value: any}[], body: any): any {
        return this.http.put(this.getBuiltUrl(endPoint, params), body);
    }

    private delete(endPoint: string, params: {key: any, value: any}[], body: any): any {
        return this.http.delete(this.getBuiltUrl(endPoint, params), body);
    }

    // TAG

    getTagsByProduct(idProduit: string): any {
        return this.get(this.tagController + '/byProduct', [{key: 'idProduit', value: idProduit}]);
    }

    putTagOnProduct(idProduit: string, tag: string): any {
        return this.put(this.tagController + '/tagOnProduct', [{key: 'idProduit', value: idProduit}, {key: 'tag', value: tag}], {});
    }

    validateTag(idTag: number): any {
        return this.put(this.tagController + '/validateTag', [{key: 'idTag', value: idTag}], {});
    }

    refuseTag(idTag: number): any {
        return this.put(this.tagController + '/refuseTag', [{key: 'idTag', value: idTag}], {});
    }

    // abonnements

    follow(idFollower: number, idFollows: number): any {
        return this.put(this.abonnementController + '/follow',
            [{key: 'follower', value: idFollower}, {key: 'follows', value: 'follows'}], {});
    }

    unfollow(idFollower: number, idFollows: number): any {
        return this.delete(this.abonnementController + '/unfollow',
            [{key: 'follower', value: idFollower}, {key: 'follows', value: 'follows'}], {});
    }

    getFollows(idUser: string): any {
        return this.get(this.abonnementController + '/follows', [{key: 'userId', value: idUser}]);
    }

    getFollowers(idUser: string): any {
        return this.get(this.abonnementController + '/followers', [{key: 'userId', value: idUser}]);
    }

    // signalements

    getSignalements(idSignalement: string): any {
        return this.get(this.signalementController + '/get', [{key: 'signalementId', value: idSignalement}]);
    }

    createSignalement(signalement: any): any {
        return this.put(this.signalementController + '/newSignalement', [], signalement);
    }

    listSignalements(status: string): any {
        return this.get(this.signalementController + '/list', [{key: 'status', value: status}]);
    }

    // associations

    getAssociationByProduct(idProduct: number): any {
        return this.get(this.associationController + '/byProduct', [{key: 'idProduct', value: idProduct}]);
    }

    newAssociation(idProductA: string, fournisseurA: string, idProductB: string, fournisseurB: string): any {
        return this.put(this.associationController + '/create',
            [{key: 'idProductA', value: idProductA}, {key: 'idfournA', value: fournisseurA},
                {key: 'idProductB', value: idProductB}, {key: 'idfournB', value: fournisseurB}], {});
    }

    deleteAssociation(idAssociation: number): any {
        return this.delete(this.associationController + '/delete', [{key: 'idAssociation', value: idAssociation}], {});
    }


    // user

    getUser(userId: number): any {
        return this.get(this.userController + '/get', [{key: 'userId', value: userId}]);
    }

    getCurrentUser(): any {
        return this.get(this.userController + '/current', []);
    }

    // vote

    putVote(vote: any): any {
        return this.put(this.voteController + '/vote', [], vote);
    }

    getVoteByUser(idUser: number): any {
        return this.get(this.voteController + '/userVote', [{key: 'userId', value: idUser}]);
    }

    getVoteByAsso(idAsso: number): any {
        return this.get(this.voteController + '/AssoVote', [{key: 'AssoId', value: idAsso}]);
    }

    // product

    getFilmByID(idProduct: string): any {
        return this.get(this.productController + '/getFilmByIdFromReferentiel', [{key: 'filmId', value: idProduct}]);
    }

    getBookyID(idProduct: string): any {
        return this.get(this.productController + '/getBookByIdFromReferentiel', [{key: 'bookId', value: idProduct}]);
    }

    searchFilm(searchTerms: string): any {
        return this.get(this.productController + '/getFilmsByTitleFromReferentiel', [{key: 'research', value: searchTerms}]);
    }

    // comment

}
