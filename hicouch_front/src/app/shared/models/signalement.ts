import {Commentaire} from './commentaire';
import {User} from './user';

export class Signalement {
    id: number;
    typeSignalement: string;
    signaledUser: User;
    signaledComment: Commentaire;
    auteur: User;
    message: string;
    status: number;
    moderator: User;
    createdAt: Date;
    updatedAt: Date;
}
