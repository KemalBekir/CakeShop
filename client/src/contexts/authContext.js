import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import React from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useLocalStorage("auth", {});

  const userLogin = (authData) => {
    setAuth(authData);
  };

  const userLogout = () => {
    localStorage.clear();
    setAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user: auth,
        userLogin,
        userLogout,
        isAuthenticated: !!auth.accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    return context;
};
