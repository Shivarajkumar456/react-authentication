import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const localToken = localStorage.getItem('token');
  const [token, setToken] = useState(localToken);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
    setTimeout(logoutHandler, 5*60*1000);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    // set up event listener to reset timer on user activity
    const resetTimer = () => {
      clearTimeout(logoutTimer);
      if (userIsLoggedIn) {
        logoutTimer = setTimeout(logoutHandler, 5*60*1000);
      }
    };
    let logoutTimer;
    window.addEventListener('mousedown', resetTimer);
    window.addEventListener('keydown', resetTimer);
    return () => {
      window.removeEventListener('mousedown', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [userIsLoggedIn]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;