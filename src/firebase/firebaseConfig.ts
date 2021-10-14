// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import {
	getAuth,
	createUserWithEmailAndPassword,
	sendEmailVerification,
	signOut,
} from 'firebase/auth';
import noProfile from '../images/no-user.jpg';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyB_75c8q8bVamfAkqfqAfeptun50X0y93k',
	authDomain: 'instagram-clone-2f155.firebaseapp.com',
	projectId: 'instagram-clone-2f155',
	storageBucket: 'instagram-clone-2f155.appspot.com',
	messagingSenderId: '638518626718',
	appId: '1:638518626718:web:d450ac65e1f07588716e8f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
export const auth = getAuth();

// sign up
export const signUpUser = (email: string, password: string) => {
	try {
		const user = createUserWithEmailAndPassword(auth, email, password);
		console.log(user);
	} catch (error) {
		console.log(error);
	}
};

// users profiles
export interface usersAuth {
	uid: string;
	userName?: string | null;
	displayName: string | null;
	email: string | null;
	following?: number[];
	followers?: number[];
	profilePicture?: string;
	createdDate?: number;
}

export const handleUserProfile = async (usersAuth: usersAuth) => {
	if (!usersAuth) return;
	const userRef = doc(db, 'users', `${usersAuth.uid}`);
	const docSnap = await getDoc(userRef);

	if (!docSnap.exists()) {
		const time = new Date().getTime();
		// if user do not exist
		try {
			await setDoc(doc(db, 'users', usersAuth.uid), {
				userName: usersAuth.userName,
				name: usersAuth.displayName,
				email: usersAuth.email,
				following: [],
				followers: [],
				profilePicture: noProfile,
				createdDate: time,
			});
			// send the verification email
			if (auth.currentUser) {
				sendEmailVerification(auth.currentUser).then(() => {
					// Email verification sent!
					alert(`an email was sent to the email: ${usersAuth.email}`);
				});
			}
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	}
	return docSnap.data();
};

export const handleSignOut = () => {
	signOut(auth).then(() => {
		alert('sign-Out successful');
		window.location.href = '/';
	});
};
