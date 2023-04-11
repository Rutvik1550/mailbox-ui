import { createContext, useContext, useState } from "react";

import React from "react";

const initialState = {
  token: "",
  setToken: () => {},
};

export const AuthContext = createContext(initialState);

export function AuthWrapper({ children }) {
  const [token, setToken] = useState("");

  let value = {
    token,
    setToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};
