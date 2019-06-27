import {Association} from './association';
import {User} from './user';
import {Vote} from './vote';

export interface Comment {
    association: Association;
    auteur: User;
    commentaire: CommentaireMeta;
    owned: boolean;
    vote: Vote;
    isUpvoted?: Boolean;
    isDownvoted?: Boolean;
}

export interface CommentaireMeta {
    id: number;
    commentaire: string;
    idUser: number;
    idPair: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    note?: number;
}
