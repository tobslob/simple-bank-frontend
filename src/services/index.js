import axios from "axios";
import { clearUser } from "../utils";
import RouteService from "../services/route.service";
import routeService from "../services/route.service";

const baseurl = process.env.REACT_APP_BASE_URL;

export const client = axios.create({
  baseURL: baseurl,
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
  },
});

client.interceptors.response.use(
  function (successRes) {
    return successRes;
  },
  function (error) {
    const checkAuth = window.location.pathname.startsWith(
      routeService.dashboard
    );
    if (checkAuth) {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        clearUser();
        window.location.href = RouteService.login;

        return Promise.reject(error);
      }
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

const ApiService = {
  init: (url) => {
    client.defaults.baseURL = url;
  },

  setHeader: (token) => {
    client.defaults.headers["Authorization"] = `Bearer ${token}`;
  },
};

export default ApiService;
