import axios from 'axios';
import keycloak from './keycloak'
const _axios = axios.create();

const configure = () => {
  _axios.interceptors.request.use((config = {}) => {
    if (!!keycloak.token) {
      const cb = () => {
        config.headers!.Authorization = `Bearer ${keycloak.token}`;
        return Promise.resolve(config);
      };
      return updateToken(cb);
    }
  });
};

const updateToken = (successCallback: () => void) =>
  keycloak.updateToken(5)
    .then(successCallback)
    .catch(keycloak.login);

configure();

export const getAxiosClient = () => _axios;