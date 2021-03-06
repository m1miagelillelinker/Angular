import {Movie, Product} from './product';
import {Comment} from './comment';
import {Vote} from './vote';

export interface Association {
    association: AssociationMeta;
    productA?: Product;
    productB?: Product;
    vote?: Vote;
}

export interface AssociationMeta {
    id: number;
    idProduitA: string;
    idfournA: string;
    idProduitB: string;
    idfournB: string;
    idPair?: number;
    idComment?: number;
    note?: number;
}
