import { client } from "../services/index";

const usersServices = {
  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      return client
        .get(`users/${id}`)
        .then((res) => resolve(res.data))
        .catch((e) => {
          reject(e);
        });
    });
  },
};

export { usersServices };
