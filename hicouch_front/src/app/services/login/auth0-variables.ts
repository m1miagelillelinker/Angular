interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'Hedahuz2iDLytMJHcSmzwi8YLpVyHAMh',
  domain: 'hicouch.eu.auth0.com',
  callbackURL: 'http://localhost:4200/app/home'
};
