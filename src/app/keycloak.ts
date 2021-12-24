import Keycloak from 'keycloak-js';

const keycloak = Keycloak({
  url: 'http://localhost:8180/auth/',
  //url: 'https://keycloak-group-7.apps.ocp.trainee.ru.com/auth',
  realm: 'springboot',
  clientId: 'react',
});

keycloak.onTokenExpired = () => {
  console.log('token expired', keycloak.token);
  keycloak.updateToken(10)
    .then(() => {
      console.log('successfully get a new token', keycloak.token);
    })
    .catch((error) => console.log(error));
}

export default keycloak;