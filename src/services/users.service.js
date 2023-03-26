import { client } from "../services/index";

const usersServices = {
  getUserByToken: (token) => {
    return new Promise((resolve, reject) => {
      return client
        .get(`users/${token}`)
        .then((res) => resolve(res.data))
        .catch((e) => {
          reject(e);
        });
    });
  },
};

export { usersServices };
