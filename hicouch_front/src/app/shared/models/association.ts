import {Movie, Product} from './product';

export interface Association {
    association: AssociationMeta;
    note: number;
    productA: Product;
    productB: Product;
    vote;
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
