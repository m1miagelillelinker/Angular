export interface Signalement {
    id?: number;
    typeSignalement: string;
    SignaledUserId: number;
    SignaledCommentId: number;
    message: string;
    idUser: number;
    status?: number;
    createdat?: Date;
    updatedat?: Date;
}
