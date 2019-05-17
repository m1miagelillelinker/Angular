export class signalement {
    id: number;
    typeSignalement: string;
    signaledUserId: number;
    signaledCommentId: number;
    userId: number;
    message: string;
    status: number;
    moderator: number;
    createdAt: Date;
    updatedAt: Date;
}
