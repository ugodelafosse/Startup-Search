import { environment } from '../../environments/environment';

interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
  silentCallbackURL: string;
  audience: string;
  apiUrl: string;
}

let callbackURL = '';
if (environment.host === 'localhost') {
  callbackURL = 'http://localhost:4200/callback';
} else {
  callbackURL = 'http://'+environment.host+'/callback';
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'B2DzXsWu25yewfWWb5BpVzCGK2O6VXGE',
  domain: 'iotv-startupsearch.eu.auth0.com',
  callbackURL: callbackURL,
  silentCallbackURL: 'http://'+environment.host+':3001/silent',
  audience: 'http://localhost:8080',
  apiUrl: environment.apiGatewayURL
};

