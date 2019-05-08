import {Movie} from './product';

export interface Association {
    association: AssociationMeta;
    product: Movie;
    //userVote: Vote;
    //comments: Array<Commentaire>
}

export interface AssociationMeta {
    id: number;
    idProduitA: string;
    idfournA: string;
    idProduitB: string;
    idfournB: string;
    idPair: number;
}
