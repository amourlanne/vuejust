import axios from 'axios';

export default {
  login(username: string, password: string) {
    return new Promise((resolve, reject) => {
      axios
        .post('/login', { username, password })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response ? error.response.data.error : error);
        });
    });
  },
  getAccount() {
    return new Promise((resolve, reject) => {
      axios
        .get('/account')
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response.data.error);
        });
    });
  },
  getAll() {
    return new Promise<Object[]>((resolve, reject) => {
      axios
        .get(`/users`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response.data.error);
        });
    });
  },
  getOneByOrganizationSlugAndUsername(organizationSlug: string, username: string) {
    return new Promise<Object>((resolve, reject) => {
      axios
        .get(`/organizations/${organizationSlug}/users/${username}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response.data.error);
        });
    });
  },
  signup(formData) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/signup`, formData)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response.data.error);
        });
    });
  },
  updateAccountProfile( profile ) {

    let formData = new FormData();

    formData.append('firstName', profile.firstName);
    formData.append('lastName', profile.lastName);
    formData.append('email', profile.email);

    if(typeof profile.avatar !== 'undefined') {
      formData.append('avatar', profile.avatar);
    }

    return new Promise<Object>((resolve, reject) => {
      axios
        .post(`/account/profile`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response.data.error);
        });
    });
  },
  accountConfirmation(formData: { password; passwordRepeat }, token: string) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/account-confirmation/${token}`, formData)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response.data.error);
        });
    });
  },
  accountConfirmationValidateToken(token: string) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/account-confirmation/${token}/validate-token`)
        .then(response => {
          resolve(response.data.valid);
        })
        .catch(error => {
          reject(error.response.data.error);
        });
    });
  },
};

// add client
