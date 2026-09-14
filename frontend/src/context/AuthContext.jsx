import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('polyscale-user') || 'null'));
  const [token, setToken] = useState(() => localStorage.getItem('polyscale-token') || '');

  const login = (userData, tokenValue) => {
    setUser(userData);
    setToken(tokenValue);
    localStorage.setItem('polyscale-user', JSON.stringify(userData));
    localStorage.setItem('polyscale-token', tokenValue);
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('polyscale-user');
    localStorage.removeItem('polyscale-token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
