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

export interface UserState {
	uid: string;
	userName: string;
	displayName: string;
	email: string;
	following: string[];
	followers: string[];
	profilePicture: string;
	createdDate: number;
}

export const userInfo = React.createContext<UserState>({
	uid: '',
	userName: '',
	displayName: '',
	email: '',
	following: [],
	followers: [],
	profilePicture: '',
	createdDate: 0,
});

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
					setUserData({
						uid: currentUserData.uid,
						userName: currentUserData.userName,
						displayName: currentUserData.displayName,
						email: currentUserData.email,
						following: currentUserData.following,
						followers: currentUserData.followers,
						profilePicture: currentUserData.profilePicture,
						createdDate: currentUserData.createdDate,
					});
				}
				console.log(currentUserData);
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
						path="/feed/:userId"
						render={() => (
							<Layout>
								<Feed />
							</Layout>
						)}
					/>
					<Route
						path="/explore/:userId"
						render={() => (
							<Layout>
								<Explore />
							</Layout>
						)}
					/>
					<Route
						path="/direct/inbox/:userId"
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
