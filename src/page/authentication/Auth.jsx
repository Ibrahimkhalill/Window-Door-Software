// auth.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(
localStorage.getItem("username")
);

  const login = (username,roles,discount) => {
    console.log(username);
    localStorage.setItem("username",username);
    localStorage.setItem("role", roles );
    localStorage.setItem("discount",discount)
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("username");
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
