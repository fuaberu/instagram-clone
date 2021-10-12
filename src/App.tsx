import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './pages/layout/Layout';
import Homepage from './pages/sign-in/Homepage';
import SignUp from './pages/sign-up/SignUp';
import MainPage from './pages/mainPage/MainPage';

function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact path="/" render={() => <Homepage />} />
				<Route path="/accounts/emailsignup" render={() => <SignUp />} />
				<Route
					path="/feed"
					render={() => (
						<Layout>
							<MainPage />
						</Layout>
					)}
				/>
			</Switch>
		</div>
	);
}

export default App;
