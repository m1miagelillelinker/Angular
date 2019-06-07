import {Movie, Product} from './product';
import {Comment} from './comment';
import {Vote} from './vote';

export interface Association {
    association: AssociationMeta;
    product?: Product;
    userVote?: Vote;
    votes: number;
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
