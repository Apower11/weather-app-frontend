import { useState, useCallback, useEffect } from 'react';

export const usePreferences = () => {
  const [temperatureMeasurement, setTemperatureMeasurement] = useState("celsius");

  // Changes the temperatureMeasurement state variable value to 'celsius'
  const changeToCelsius = useCallback(() => {
    setTemperatureMeasurement('celsius');
    localStorage.setItem('temperatureMeasurement', JSON.stringify({measurementUnit: "celsius"}));
  }, []);

    // Changes the temperatureMeasurement state variable value to 'fahrenheit'
  const changeToFahrenheit = useCallback(() => {
    setTemperatureMeasurement('fahrenheit');
    localStorage.setItem('temperatureMeasurement', JSON.stringify({measurementUnit: "fahrenheit"}));
  }, []);

  // Checks that the temperature measurement preference is being stored in local storage
  // and also prints to the console what the preference is currently set to.
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