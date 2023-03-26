import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import numeral from "numeral";
import { storageService } from "../services/storage.service";

export function uuid() {
  return uuidv4();
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const hyphenateWord = (word) => {
  return word.trim().replace(" ", "-");
};

export function isImage(url) {
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}

export const replaceImgIp = (img) => {
  const baseurl = process.env.BASE_URL;

  return img.replace("http://54.211.219.238:8080/v1", baseurl);
};

export const toIso = (date) => {
  return moment(date)?.toISOString()?.split("T")[0];
};
export function toTitleCase(str) {
  return str?.replace(/\w\S*/g, function (txt) {
    return txt?.charAt(0).toUpperCase() + txt?.substr(1)?.toLowerCase();
  });
}

export const uppercaseWords = (str) =>
  str?.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());

export const clearUser = () => {
  storageService.clearItem("user");
  storageService.clearItem("token");
};
export const saveUser = (user, token) => {
  user && storageService.setItem("user", user);
  token && storageService.setItem("token", token);
};
export function formatNumber(value, format = "", rounding = Math.floor) {
  return numeral(value).format(format, rounding);
}
