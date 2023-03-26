import React, { createContext, useContext, useState } from "react";
import { usersServices } from "../services/users.service";
import { saveUser } from "../utils";

const PositionContext = createContext();
const Provider = PositionContext.Provider;
function UsersProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const getUserByToken = (id, onComplete) => {
    setLoading(true);
    usersServices
      .getUserByToken(id)
      .then((res) => {
        setLoading(false);
        console.log("res", res);
        setUser({ claim: res?.data });
        saveUser(res);
        onComplete && onComplete(res);
      })
      .catch((e) => {
        setLoading(false);
        console.log("e", e);
      });
  };

  const value = {
    loading,
    getUserByToken,
    user,
  };
  return <Provider value={value}>{children}</Provider>;
}

export function useUsersContext() {
  const context = useContext(PositionContext);
  if (!context) {
    throw new Error("Wrap component in context ");
  }

  return context;
}

export default UsersProvider;
