import {Association} from './association';
import {User} from './user';

export interface Comment {
    association: Association;
    auteur: User;
    commentaire: CommentaireMeta;
    owned: boolean;
}

export interface CommentaireMeta {
    id: number;
    commentaire: string;
    idUser: number;
    idPair: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}
