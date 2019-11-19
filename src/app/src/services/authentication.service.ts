import * as config from '../../../config.json';
import axios from 'axios';

const { token } = config.cookie;

export default {
  logout() {
    window.$cookies.remove(token.payload.name);
  },
  authenticate() {
    return new Promise((resolve, reject) => {
      axios
        .get('/authenticate')
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response.data.error);
        });
    });
  },
};
