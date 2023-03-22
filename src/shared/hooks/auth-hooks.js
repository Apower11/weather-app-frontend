import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
  // Defines relevant state attributes and setters.
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [user, setUser] = useState(false);

  // Function for logging a user in by storing the user id, details and
  // token in local storage.
  const login = useCallback((userId, user, token, expirationDate) => {
    setToken(token);
    setUser(user);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem('userData', JSON.stringify({ 
      userId: userId, 
      token: token, 
      user: user, 
      expiration: tokenExpirationDate.toISOString()
     }));
  }, []);

  // Logs the user out by removing all user data from local storage.
  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUser(null);
    localStorage.removeItem('userData');
  }, []);

  // Checks if the user is logged in and if their token and token expiration date are
  // defined. It then sets a timer to automatically log the user out aften the current time
  // passes the token expiration date.
  useEffect(() => {
    if(token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate])

  // Checks if a user's data is stored in local storage and if it is it then
  // automatically logs them in.
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData && 
      storedData.token &&
      new Date(storedData.expiration) > new Date()
      ) {
      login(storedData.userId, storedData.user, storedData.token);
    }
  }, [login]);

  return { token, login, logout, user };
}