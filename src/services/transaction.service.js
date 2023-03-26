import { client } from "src/services/index";

const transactionService = {
  getTransactions: (params = { limit: 10 }) => {
    return new Promise((resolve, reject) => {
      return client
        .get(`entities`, {
          params,
          "Content-Type": "application/json",
        })
        .then((res) => resolve(res.data))
        .catch((e) => {
          reject(e);
        });
    });
  },
};

export { transactionService };
