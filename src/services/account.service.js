import { client } from "src/services/index";

const accountServices = {
  addMoney: (params) => {
    return new Promise((resolve, reject) => {
      return client
        .patch(`accounts`, { ...params })
        .then((res) => resolve(res.data))
        .catch((e) => {
          reject(e);
        });
    });
  },
  getAccount: (id) => {
    return new Promise((resolve, reject) => {
      return client
        .get(`accounts/${id}`)
        .then((res) => resolve(res.data))
        .catch((e) => {
          reject(e);
        });
    });
  },
};

export { accountServices };
