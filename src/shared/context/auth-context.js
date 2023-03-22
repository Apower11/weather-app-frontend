import { createContext } from 'react';

// Context defined for authentication attributes and functions. This
// allows any component to easily access a function or attribute that is
// as up to date as possible.

export const AuthContext = createContext({
    isLoggedIn: false,
    user: {},
    token: null,
    login: () => {},
    logout: () => {}
})