import { createContext } from 'react';

export const PreferencesContext = createContext({
    temperatureMeasurement: "celsius",
    changeToCelsius: () => {},
    changeToFahrenheit: () => {}
})