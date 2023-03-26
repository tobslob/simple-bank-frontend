import { client } from "src/services/index";

const transferServices = {
  createTransfer: (params) => {
    return new Promise((resolve, reject) => {
      return client
        .post(`accounts`, { ...params })
        .then((res) => resolve(res.data))
        .catch((e) => {
          reject(e);
        });
    });
  },
};

export { transferServices };
