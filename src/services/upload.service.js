import { client } from "app/services/index";
import { UserInfo } from "pages/_app";

const uploadFilesService = {
  getApplicant: (id) => {
    return new Promise((resolve, reject) => {
      return client
        .get(`officers/${id}`)
        .then((res) => resolve(res.data))
        .catch((e) => {
          reject(e);
        });
    });
  },
  upload: (folder, data) => {
    const token = localStorage.getItem(UserInfo.token);

    return new Promise((resolve, reject) => {
      return client
        .post(
          `media/upload/${folder}`,
          { ...data },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          resolve(res.data);
        })
        .catch((e) => reject(e));
    });
  },
};

export { uploadFilesService };
