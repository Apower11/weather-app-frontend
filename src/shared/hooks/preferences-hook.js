import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const usePreferences = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [user, setUser] = useState(false);
  const [temperatureMeasurement, setTemperatureMeasurement] = useState("celsius");

//   const login = useCallback((userId, user, token, expirationDate) => {
//     setToken(token);
//     setUser(user);
//     const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
//     setTokenExpirationDate(tokenExpirationDate);
//     localStorage.setItem('userData', JSON.stringify({ 
//       userId: userId, 
//       token: token, 
//       user: user, 
//       expiration: tokenExpirationDate.toISOString()
//      }));
//   }, []);

  const changeToCelsius = useCallback(() => {
    setTemperatureMeasurement('celsius');
    localStorage.setItem('temperatureMeasurement', JSON.stringify({measurementUnit: "celsius"}));
  }, []);

  const changeToFahrenheit = useCallback(() => {
    setTemperatureMeasurement('fahrenheit');
    localStorage.setItem('temperatureMeasurement', JSON.stringify({measurementUnit: "fahrenheit"}));
  }, []);

//   const getTemperatureMeasurement = useCallback(() => {
//     setTemperatureMeasurement('fahrenheit');
//     localStorage.setItem('temperatureMeasurement', JSON.stringify({measurementUnit: "fahrenheit"}));
//     return JSON.parse(localStorage.getItem('temperatureMeasurement')).measurementUnit;
//   }, []);

//   useEffect(() => {
//     if(token && tokenExpirationDate) {
//       const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
//       logoutTimer = setTimeout(logout, remainingTime)
//     } else {
//       clearTimeout(logoutTimer);
//     }
//   }, [token, logout, tokenExpirationDate])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('temperatureMeasurement')).measurementUnit;
    if (
      storedData == "celsius"
      ) {
      console.log("Celsius Measuree");
    } else {
        console.log("Fahrenheit Measure");
    }
    setTemperatureMeasurement(storedData);
  }, [changeToCelsius, changeToFahrenheit]);

  return { changeToCelsius, changeToFahrenheit, temperatureMeasurement };
}