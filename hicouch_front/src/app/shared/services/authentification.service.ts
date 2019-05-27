import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from '../../services/login/auth0-variables';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';

import { User } from '../../shared/models/user';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticationService {

    private _idToken: string;
    private _accessToken: string;
    private _expiresAt: number;
    private _loggedUser: User;

    auth0 = new auth0.WebAuth({
        clientID: AUTH_CONFIG.clientID,
        domain: AUTH_CONFIG.domain,
        responseType: 'token id_token',
        redirectUri: AUTH_CONFIG.callbackURL,
        audience: 'http://localhost:8080',
        scope: 'openid'
    });

    constructor(public router: Router,
        private http: HttpClient) {
        this._idToken = '';
        this._accessToken = '';
        this._expiresAt = 0;
    }

    get accessToken(): string {
        return this._accessToken;
    }

    get idToken(): string {
        return this._idToken;
    }

    get loggedUser(): User {
        return this._loggedUser;
    }

    public login(): void {
        this.auth0.authorize();
    }

    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.localLogin(authResult);
                this.router.navigate(['/home']);
            } else if (err) {
                this.router.navigate(['/home']);
                console.log(err);
                alert(`Error: ${err.error}. Check the console for further details.`);
            }
        });
    }

    private localLogin(authResult): void {
        // Set the time that the access token will expire at
        const expiresAt = (authResult.expiresIn * 1000) + Date.now();
        this._accessToken = authResult.accessToken;
        this._idToken = authResult.idToken;
        this._expiresAt = expiresAt;
        console.debug(this._accessToken);
        console.debug(this._idToken );
        
        this._loggedUser = {id: null, lastName: null, firstName: null, accessToken: this._accessToken, idToken: this._idToken, expiresAt: this._expiresAt }
    }

    public renewTokens(): void {
        this.auth0.checkSession({}, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.localLogin(authResult);
            } else if (err) {
                alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
                this.logout();
            }
        });
    }

    public logout(): void {
        // Remove tokens and expiry time
        this._accessToken = '';
        this._idToken = '';
        this._expiresAt = 0;

        this.auth0.logout({
            return_to: window.location.origin
        });
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // access token's expiry time
        return this._accessToken && Date.now() < this._expiresAt;
    }


    getCurrentUser() {
        return this.http.get<User>(`//localhost:8080/user/get?userId=1`);
    }

    log() {
        //
    }
}
