import React, { createContext, useContext, useMemo, useState } from "react";
import useTokenHeaders from "app/hooks/useTokenHeaders";
import { UserInfo } from "pages/_app";

export const AuthUserContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [token, setToken] = useState();

  useTokenHeaders();

  const setCurrentUser = (value) => {
    setUser((prev) => ({ ...prev, value }));
    localStorage.setItem(UserInfo.user, JSON.stringify(value));
  };

  const getUser = () => {
    const user = localStorage.getItem(UserInfo.user);
    if (user && user !== "undefined") {
      const value = JSON.parse(user);
      setUser((prev) => ({ ...prev, ...value }));
      return value;
    }
  };

  const clearUser = () => {
    localStorage.removeItem(UserInfo.user);
    localStorage.removeItem(UserInfo.refreshToken);
  };

  const values = useMemo(() => {
    return {
      user,
      token,
      setCurrentUser,
      getUser,
      clearUser,
    };
  }, [user]);

  return (
    <AuthUserContext.Provider value={values}>
      {children}
    </AuthUserContext.Provider>
  );
}

export function useAuthUser() {
  const userContext = useContext(AuthUserContext);

  console.log("userContext", userContext);
  if (userContext === undefined) {
    throw new Error("useAuthContextState must be used within a AuthProvider");
  }

  return userContext;
}

export default AuthContextProvider;
