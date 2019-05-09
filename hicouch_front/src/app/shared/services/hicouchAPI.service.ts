export class HicouchAPIService {

    private static DOMAIN = 'http://localhost:8080';

    private static tagController = '/tag';
    private static abonnementController = '/abonnement';
    private static signalementController = '/signalement';
    private static associationController = '/association';
    private static userController = '/user';
    private static productController = '/product';
    private static commentController = '/comment';

    private static hicouchAPICall(endPoint: string, params: {key: any, value: any}[], body: any, method: string): any {
        let paramString = '?';
        // add each param to paramString, and '&' between params (not after the last one)
        params.map((p: any) => paramString += (p.key + '=' + p.value + (params.indexOf(p) === params.length ? '&' : '')));
        // build complete URL with domain, controller and '?' + params if present
        const completeURL = this.DOMAIN + endPoint + (paramString !== '?' ? paramString : '');
        // TODO: add cache, credentials
        return fetch(completeURL, {body: body, method: method});
    }

    private static get(endPoint: string, params: {key: any, value: any}[]): any {
        return HicouchAPIService.hicouchAPICall(endPoint, params , null, 'get');
    }

    private static put(endPoint: string, params: {key: any, value: any}[], body: any): any {
        return HicouchAPIService.hicouchAPICall(endPoint, params , body, 'put');
    }

    // TAG

    static getTagsByProduct(idProduit: string): any {
        return this.get(this.tagController + '/byProduct', [{key: 'idProduit', value: idProduit}]);
    }

    static putTagOnProduct(idProduit: string, tag: string): any {
        return this.put(this.tagController + '/tagOnProduct', [{key: 'idProduit', value: idProduit}, {key: 'tag', value: tag}], {});
    }

}
