import {Movie, Product} from './product';
import {Comment} from './comment';

export interface Association {
    association: AssociationMeta;
    product: Product;
    productDTO?: Product;
    // userVote: Vote;
    comments: Array<Comment>;
}

export interface AssociationMeta {
    id: number;
    idProduitA: string;
    idfournA: string;
    idProduitB: string;
    idfournB: string;
    idPair: number;
}
