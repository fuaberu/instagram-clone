import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './pages/layout/Layout';
import Homepage from './pages/sign-in/Homepage';
import SignUp from './pages/sign-up/SignUp';
import Feed from './pages/feed/Feed';
import Explore from './pages/explore/Explore';
import Inbox from './pages/inbox/Inbox';
import { auth, handleUserProfile } from './firebase/firebaseConfig';
import { onAuthStateChanged } from '@firebase/auth';

export const userInfo = React.createContext({});

interface UserState {
	uid?: string;
	userName?: string | null;
	displayName?: string | null;
	email?: string | null;
	following?: number[];
	followers?: number[];
	profilePicture?: string;
	createdDate?: number;
}

function App() {
	const [userData, setUserData] = useState<UserState>({
		uid: '',
		userName: '',
		displayName: '',
		email: '',
		following: [],
		followers: [],
		profilePicture: '',
		createdDate: 0,
	});

	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				const currentUserData = await handleUserProfile(user);
				if (currentUserData) {
					setUserData(currentUserData);
				}
				console.log(currentUserData);
			} else {
				// User is signed out
				// ...
			}
		});
	}, []);
	return (
		<userInfo.Provider value={userData}>
			<div className="App">
				<Switch>
					<Route exact path="/" render={() => <Homepage />} />
					<Route path="/accounts/emailsignup" render={() => <SignUp />} />
					<Route
						path="/feed"
						render={() => (
							<Layout>
								<Feed />
							</Layout>
						)}
					/>
					<Route
						path="/explore"
						render={() => (
							<Layout>
								<Explore />
							</Layout>
						)}
					/>
					<Route
						path="/direct/inbox"
						render={() => (
							<Layout>
								<Inbox />
							</Layout>
						)}
					/>
				</Switch>
			</div>
		</userInfo.Provider>
	);
}

export default App;
