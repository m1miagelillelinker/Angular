import {Movie, Product} from './product';

export interface Association {
    association: AssociationMeta;
    product: Product;
    // userVote: Vote;
    // comments: Array<Commentaire>
}

export interface AssociationMeta {
    id: number;
    idProduitA: string;
    idfournA: string;
    idProduitB: string;
    idfournB: string;
    idPair: number;
}
