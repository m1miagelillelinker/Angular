export interface Comment {
    id?: number;
    commentaire: string;
    note?: number;
    iduser: number;
    idpair: number;
    status?: number;
    createdat?: Date;
    updatedate?: Date;
}
