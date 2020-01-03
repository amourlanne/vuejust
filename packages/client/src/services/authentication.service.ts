import axios from 'axios';

export default {
  logout() {
    window.$cookies.remove('token_payload');
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
