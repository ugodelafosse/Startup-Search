import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth0-variables';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import { Http } from '@angular/http';

@Injectable()
export class AuthService {

    userProfile: any;
    refreshSubscription: any;
    requestedScopes: string = 'openid profile email read:timesheets create:timesheets';

    auth0 = new auth0.WebAuth({
        clientID: AUTH_CONFIG.clientID,
        domain: AUTH_CONFIG.domain,
        responseType: 'token id_token',
        audience: AUTH_CONFIG.audience,
        redirectUri: AUTH_CONFIG.callbackURL,
        scope: this.requestedScopes,
        leeway: 30
    });

    constructor(public router: Router, public http: Http) { }

    public login(): void {
        this.auth0.popup.authorize();
    }

    public loginWithGoogle(): void {
        this.auth0.popup.authorize({ connection: 'google-oauth2' });
    }

    public loginWithLinkedin(): void {
        this.auth0.popup.authorize({ connection: 'linkedin' });
    }

    // Pour le login avec email + mdp : Trouver le moyen de les faire passer
    // depuis les inputs HTML vers ces fonctions en argument
    /*
    public loginDb(): void {
    this.auth0.redirect.loginWithCredentials({
    connection: 'Username-Password-Authentication',
    username: $('.login-username').val(),
    password: $('.login-password').val(),
    scope: 'openid'
    });
    }

    public loginCrossOrigin(): void {
    this.auth0.login({
    username: $('.cross-origin-auth-username').val(),
    password: $('.cross-origin-auth-password').val(),
    redirectURI: 'https://localhost:3000/example/',
    realm: 'Username-Password-Authentication'
    });
    }
    */

    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.auth0.popup.callback();
                window.location.hash = '';
                this.setSession(authResult);
                this.router.navigate(['/home']);
            } else if (err) {
                this.auth0.popup.callback();
                this.router.navigate(['/home']);
                console.log(err);
                alert(`Error: ${err.error}. Check the console for further details.`);
            }
        });
    }

    public getProfile(cb): void {

        const self = this;
        const idToken = localStorage.getItem('id_token');
        if (!idToken) {
            throw new Error('ID token must exist to fetch profile');
        }
        this.http.get('https://'+AUTH_CONFIG.domain+'/tokeninfo', {
            method: 'GET',
            params : {
                'id_token': idToken
            }
        }).subscribe(data => {
            if (data) {
                self.userProfile = JSON.parse(data['_body']);
            }
            cb(self.userProfile);
        });

        // Le code ci-dessous récupérait seulement une partie du profil utilisateur
        // const accessToken = localStorage.getItem('access_token');
        // if (!accessToken) {
        //   throw new Error('Access token must exist to fetch profile');
        // }
        // this.auth0.client.userInfo(accessToken, (err, profile) => {
        //   if (profile) {
        //     self.userProfile = profile;
        //   }
        //   cb(err, profile);
        // });
    }

    public getProduct(cb): void {

        const self = this;
        const idToken = localStorage.getItem('id_token');
        if (!idToken) {
            throw new Error('ID token must exist to fetch profile');
        }
        this.http.get('https://'+AUTH_CONFIG.domain+'/tokeninfo', {
            method: 'GET',
            params : {
                'id_token': idToken
            }
        }).subscribe(data => {
            if (data) {
                self.userProfile = JSON.parse(data['_body']);
            }
            cb(self.userProfile);
        });

        // Le code ci-dessous récupérait seulement une partie du profil utilisateur
        // const accessToken = localStorage.getItem('access_token');
        // if (!accessToken) {
        //   throw new Error('Access token must exist to fetch profile');
        // }
        // this.auth0.client.userInfo(accessToken, (err, profile) => {
        //   if (profile) {
        //     self.userProfile = profile;
        //   }
        //   cb(err, profile);
        // });
    }

    private setSession(authResult): void {
        // Set the time that the access token will expire at
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

        // If there is a value on the `scope` param from the authResult,
        // use it to set scopes in the session for the user. Otherwise
        // use the scopes as requested. If no scopes were requested,
        // set it to nothing
        const scopes = authResult.scope || this.requestedScopes || '';

        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        localStorage.setItem('scopes', JSON.stringify(scopes));
        this.scheduleRenewal();
    }

    public logout(): void {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('scopes');
        this.unscheduleRenewal();
        // Go back to the home route
        this.router.navigate(['/']);
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // access token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    public userHasScopes(scopes: Array<string>): boolean {
        const grantedScopes = JSON.parse(localStorage.getItem('scopes')).split(' ');
        return scopes.every(scope => grantedScopes.includes(scope));
    }

    public renewToken() {
        this.auth0.renewAuth({
            audience: AUTH_CONFIG.audience,
            redirectUri: AUTH_CONFIG.silentCallbackURL,
            usePostMessage: true
        }, (err, result) => {
            if (err) {
                //alert(`Could not get a new token using silent authentication (${err.error}).`);
            } else {
                //alert(`Successfully renewed auth!`);
                this.setSession(result);
            }
        });
    }

    public scheduleRenewal() {
        if (!this.isAuthenticated()) return;

        const expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));

        const source = Observable.of(expiresAt).flatMap(
            expiresAt => {

                const now = Date.now();

                // Use the delay in a timer to
                // run the refresh at the proper time
                var refreshAt = expiresAt - (1000 * 30); // Refresh 30 seconds before expiry
                return Observable.timer(Math.max(1, refreshAt - now));
            });

        // Once the delay time from above is
        // reached, get a new JWT and schedule
        // additional refreshes
        this.refreshSubscription = source.subscribe(() => {
            this.renewToken();
        });
    }

    public unscheduleRenewal() {
        if (!this.refreshSubscription) return;
        this.refreshSubscription.unsubscribe();
    }
}

