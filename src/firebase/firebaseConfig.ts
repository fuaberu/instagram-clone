// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	updateDoc,
	arrayUnion,
	arrayRemove,
} from 'firebase/firestore';
import {
	getAuth,
	createUserWithEmailAndPassword,
	sendEmailVerification,
	signOut,
} from 'firebase/auth';
import { getStorage } from 'firebase/storage';
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

export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage(app);

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
export interface UsersAuth {
	uid: string;
	userName?: string;
	displayName: string | null;
	email: string | null;
	posts?: [];
	stories?: [];
	following?: number[];
	followers?: number[];
	profilePicture?: string;
	createdDate?: number;
}

export const handleUserProfile = async (usersAuth: UsersAuth) => {
	if (!usersAuth) return;
	const userRef = doc(db, 'users', `${usersAuth.uid}`);
	const docSnap = await getDoc(userRef);

	if (!docSnap.exists()) {
		const time = new Date().getTime();
		// if user do not exist
		try {
			await setDoc(doc(db, 'users', usersAuth.uid), {
				uid: usersAuth.uid,
				userName: usersAuth.userName,
				name: usersAuth.displayName,
				email: usersAuth.email,
				following: [],
				followers: [],
				posts: [],
				stories: [],
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

export const getUserData = async (user: string) => {
	const userRef = doc(db, 'users', user);
	const docSnap = await getDoc(userRef);
	return docSnap.data();
};

export const handleSignOut = () => {
	signOut(auth).then(() => {
		alert('sign-Out successful');
		window.location.href = '/';
	});
};

//follow user
export const handleFollow = async (currentUser: string, toFollow: string) => {
	const currentUserRef = doc(db, 'users', currentUser);
	const toFollowUserRef = doc(db, 'users', toFollow);

	await updateDoc(currentUserRef, {
		following: arrayUnion(toFollow),
	});
	await updateDoc(toFollowUserRef, {
		followers: arrayUnion(currentUser),
	});
};

//unfollow user
export const handleUnfollow = async (currentUser: string, toUnfollow: string) => {
	const currentUserRef = doc(db, 'users', currentUser);
	const toFollowUserRef = doc(db, 'users', toUnfollow);

	await updateDoc(currentUserRef, {
		following: arrayRemove(toUnfollow),
	});
	await updateDoc(toFollowUserRef, {
		followers: arrayRemove(currentUser),
	});
};

// update comments and like
export const updateLiked = async (post: string, currentUser: string) => {
	if (!post || !currentUser) return;
	const postRef = doc(db, 'posts', post);
	const docSnap = await getDoc(postRef);
	if (!docSnap.exists()) return;
	if (docSnap.data().liked.indexOf(currentUser) >= 0) {
		await updateDoc(postRef, {
			liked: arrayRemove(currentUser),
		});
	} else {
		await updateDoc(postRef, {
			liked: arrayUnion(currentUser),
		});
	}

	const updatedDocSnap = await getDoc(postRef);
	if (!updatedDocSnap.exists()) return;
	return updatedDocSnap.data().liked;
};

// comments
export const updateComments = async (post: string, comment?: object) => {
	if (!post) return;
	const postRef = doc(db, 'posts', post);
	const docSnap = await getDoc(postRef);
	if (docSnap.exists() && !comment) return docSnap.data().comments;
	console.log(comment);
	await updateDoc(postRef, {
		comments: arrayUnion(comment),
	});
	const updatedDocSnap = await getDoc(postRef);
	console.log(updatedDocSnap.data());
	if (!updatedDocSnap.exists()) return;
	return updatedDocSnap.data().comments;
};
