// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, addDoc, collection } from 'firebase/firestore';
import {
	getAuth,
	createUserWithEmailAndPassword,
	sendEmailVerification,
} from 'firebase/auth';
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
	userName: string;
	displayName: string;
	email: string;
	following: number[];
	followers: number[];
	createdDate: number;
}

export const handleUserProfile = async (usersAuth: usersAuth) => {
	if (!usersAuth) return;
	const userRef = doc(db, 'users', `${usersAuth.uid}`);
	const docSnap = await getDoc(userRef);

	if (!docSnap.exists()) {
		// if user do not exist
		try {
			const docRef = await addDoc(collection(db, 'users'), {
				userName: usersAuth.userName,
				name: usersAuth.displayName,
				email: usersAuth.email,
				following: [],
				followers: [],
				createdDate: Date.now(),
			});
			//send the verification email
			if (auth.currentUser) {
				sendEmailVerification(auth.currentUser).then(() => {
					// Email verification sent!
					// ...
					alert(`an email was sent to the email: ${usersAuth.email}`);
				});
			}

			console.log('Document written with ID: ', docRef.id);
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	}
	return userRef;
};
