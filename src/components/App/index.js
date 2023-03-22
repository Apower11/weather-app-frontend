import { Router } from 'preact-router';
import React from 'react';
import Timeline from '../Timeline';
import Layout from '../Layout';
import Auth from '../Auth';
import Register from '../Register';
import Redirect from '../Redirect';
import { AuthContext } from '../../shared/context/auth-context';
import { PreferencesContext } from '../../shared/context/preferences-context';
import { useAuth } from '../../shared/hooks/auth-hooks';
import { usePreferences } from '../../shared/hooks/preferences-hook';
import NotFound from '../404';
import style from './style.css';

function App() {
	const {token, login, logout, user} = useAuth();
	const { changeToCelsius, changeToFahrenheit, temperatureMeasurement } = usePreferences();
	let routes;

	// Loads the routes for the Preact App based on whether the user is logged
	// in or not

	if(!token) {
		routes = (
			<div class={style.app}>
				<Layout>
					<Router>
						<Auth path="/login" />
						<Register path="/register" />
						<Redirect path="/timeline/:timelineDate?" to="/login" />
						<Redirect path="/" to="/login" />
						<NotFound default />
					</Router>
				</Layout>
			</div>
		)
	} else {
		routes = (
			<div class={style.app}>
			<Layout>
				<Router>
					<Timeline path="/timeline/:timelineDate?" />
					<Redirect path="/login" to="/timeline" />
					<Redirect path="/register" to="/timeline" />
					{/* <Redirect path="/timeline" to="/timeline/2023-03-21" /> */}
					<NotFound default />
				</Router>
			</Layout>
		</div>
		)
	}

	// Returns the main app which is wrapped in an authentication context
	// and a preferences context.

	return (
		<AuthContext.Provider 
    value={{
      isLoggedIn: !!token,
      token: token,
      user: user, 
      login: login, 
      logout: logout}}>
      <PreferencesContext.Provider
	  value={{
		temperatureMeasurement: temperatureMeasurement,
		changeToCelsius: changeToCelsius,
		changeToFahrenheit: changeToFahrenheit
	  }}>
	  <React.StrictMode>
	  {routes}
	  </React.StrictMode>
	  </PreferencesContext.Provider>
    </AuthContext.Provider>
	)
}

export default App;
