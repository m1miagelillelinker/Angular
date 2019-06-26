import { Badge } from './badge';

export interface User {
    id: number;
    badges?: Badge[];
    lastName?: string;
    firstName?: string;
    pseudo?: string;
    score?: number;
    picture?: string;
    idToken: string;
    accessToken: string;
    expiresAt: number;
    typeUser?: number;
}

/*export interface User {
    id: number;
    firstName?: string;
    lastName?: string;
    gender?: string;
    email: string;
    typeUser: number;
    pseudo?: string;
    score?: number;
    password: string;
    idStatus: number;
    picture: string;
    createdat: Date;
    updatedat: Date;
    lastlogin: Date;
    loginscount: number;
    idauth0: string;
}*/
