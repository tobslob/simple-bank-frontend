import React, { createContext, useContext, useState } from "react";
import { usersServices } from "../services/users.service";
import { saveUser } from "../utils";

const PositionContext = createContext();
const Provider = PositionContext.Provider;
function UsersProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const getUserById = (id, onComplete) => {
    setLoading(true);
    usersServices
      .getUserById(id)
      .then((res) => {
        setLoading(false);
        console.log("res in get user by token", res);
        setUser(res?.data);
        saveUser(res?.data);
        onComplete && onComplete(res);
      })
      .catch((e) => {
        setLoading(false);
        console.log("e", e);
      });
  };

  const value = {
    loading,
    getUserById,
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
