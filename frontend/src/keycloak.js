import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: process.env.VUE_APP_LOGIN_PATH, //'http://localhost:8180', // Keycloak server URL
  realm:process.env.VUE_APP_KEYCLOAK_REALM, // 'RGZ',               // Replace 'your-realm' with your realm name
  clientId: process.env.VUE_APP_KEYCLOAK_CLIENTID,//'rgz-pdf-user',        // Replace 'your-client-id' with your client ID
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
//console.log("hehe")