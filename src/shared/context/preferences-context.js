import { createContext } from 'react';

// Context defined for preferences attributes and functions. This
// allows any component to easily access a function or attribute that is
// as up to date as possible.

export const PreferencesContext = createContext({
    temperatureMeasurement: "celsius",
    changeToCelsius: () => {},
    changeToFahrenheit: () => {}
})