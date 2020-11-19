import React, { useState, createContext } from "react";

const AuthContext = createContext();

const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    userInfo: {},
    expiresAt: null,
  });

  return (
    <Provider value={{ authState: auth, setAuthState: setAuth }}>
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
