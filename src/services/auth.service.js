import { client } from "src/services/index";

const AuthService = {
  login: ({ emailAddress, password }) => {
    return new Promise((resolve, reject) => {
      return client
        .post(`users/login`, { emailAddress, password })
        .then((res) => resolve(res?.data))
        .catch((e) => reject(e));
    });
  },
  signup: (params) => {
    return new Promise((resolve, reject) => {
      return client
        .post(`users`, { ...params })
        .then((res) => resolve(res.data))
        .catch((e) => {
          console.log("e", e);
          reject(e);
        });
    });
  },
};

export default AuthService;
