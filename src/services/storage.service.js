const storageService = {
  getItem: (key) => {
    return typeof window !== "undefined" && localStorage.getItem(key);
  },
  setItem: (key, item) => {
    let save;
    if (typeof item === "object") {
      save = JSON.stringify(item);
    } else {
      save = item;
    }
    return typeof window !== "undefined" && localStorage.setItem(key, save);
  },
  clearItem: (key) => {
    return typeof window !== "undefined" && localStorage.removeItem(key);
  },
};

export { storageService };
