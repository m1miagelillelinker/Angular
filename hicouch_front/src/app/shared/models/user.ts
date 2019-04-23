export interface User {
    id: number;
    lastName?: string;
    firstName?: string;
    pseudo?: string;
    score?: number;
    idToken: string;
    accessToken: string;
    expiresAt: number;
}
