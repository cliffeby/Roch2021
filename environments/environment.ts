import info from 'auth_config.json';

export const environment = {
  production: false,
  auth: {
    domain: info.domain,
    clientId: info.clientId,
    audience: info.authorizationParams.audience,
    redirectUri: window.location.origin,
  },
  dev: {
    apiUrl: info.apiUri
  }
};


