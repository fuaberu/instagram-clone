// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, addDoc, collection } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
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
const auth = getAuth();

// sign up
export const signUpUser = (email: string, password: string) => {
	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in
			console.log(userCredential.user);
		})
		.catch((error) => {
			console.log(error.message);
		});
};

// users profiles
interface usersAuth {
	uid: string;
	userName: string;
	displayName: string;
	email: string;
	following: number[];
	followers: number[];
	createdDate: Date;
}

export const handleUserProfile = async (usersAuth: usersAuth) => {
	if (!usersAuth) return;
	const { uid, displayName, email, userName } = usersAuth;

	const userRef = doc(db, 'users', `${uid}`);
	const docSnap = await getDoc(userRef);

	if (!docSnap.exists()) {
		// if user do not exist
		const time = Date.now();
		try {
			const docRef = await addDoc(collection(db, 'users'), {
				userName: userName,
				name: displayName,
				email: email,
				following: [],
				followers: [],
				createdDate: time,
			});

			console.log('Document written with ID: ', docRef.id);
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	}
	return userRef;
};
