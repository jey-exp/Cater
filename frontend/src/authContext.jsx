import React, { createContext, useState, useEffect, useContext } from "react";
import { json } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => JSON.parse(localStorage.getItem("isAuthenticated")) || false
  );
  const [gmail, setgmail] = useState(
    () => JSON.parse(localStorage.getItem("gmail")) || ""
  );
  const [isCaterAuthenticated, setCaterAuthenticated] = useState(()=>JSON.parse(localStorage.getItem("caterAuth")) || false);
  const [caterEmail, setCaterEmail] = useState(()=> JSON.parse(localStorage.getItem("caterEmail")) || "");
  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem("gmail", JSON.stringify(gmail));
  }, [gmail]);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);
  const caterLogin = () =>setCaterAuthenticated(true);
  const caterLogout =() => setCaterAuthenticated(false);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, gmail, setgmail, caterLogin, caterLogout, caterEmail, setCaterEmail, isCaterAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
