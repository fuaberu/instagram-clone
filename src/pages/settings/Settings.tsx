import { deleteUser, signInWithEmailAndPassword } from '@firebase/auth';
import { doc, updateDoc } from '@firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { userInfo } from '../../App';
import InputPassword from '../../components/form/InputPassword';
import SubmitBtn from '../../components/form/SubmitBtn/SubmitBtn';
import { auth, db, handleSignOut } from '../../firebase/firebaseConfig';
import style from './settings.module.css';

const Settings = () => {
	const currentUser = useContext(userInfo);

	const [name, setName] = useState(currentUser.name);
	const [userName, setUserName] = useState(currentUser.userName);

	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmNewPassword, setConfirmNewPassword] = useState('');

	const handleDangerArea = (e: React.FormEvent<HTMLFormElement>) => {
		if (newPassword !== confirmNewPassword || confirmNewPassword === oldPassword) return;
		e.preventDefault();
		signInWithEmailAndPassword(auth, currentUser.email, oldPassword)
			.then((userCredential) => {})
			.catch((error) => {
				console.log(error);
			});
	};

	const deleteAccount = () => {
		const user = auth.currentUser;
		if (!user) return;
		deleteUser(user)
			.then(() => {
				alert('User deleted');
				handleSignOut();
			})
			.catch((error) => {
				alert('An error ocurred');
			});
	};

	const handleUpdateName = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const postRef = doc(db, 'users', currentUser.uid);
		try {
			await updateDoc(postRef, {
				name: name,
				userName: userName,
			});
			alert('Name and Username updated');
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		setName(currentUser.name);
		setUserName(currentUser.userName);
		console.log(currentUser);
	}, [currentUser]);

	return (
		<main className={style.main}>
			<div className={style.content}>
				<div className={style.profile}>
					<img src={currentUser.profilePicture} alt={`${currentUser.userName} profile`} />
					<div>
						<h2>{currentUser.userName}</h2>
						<button>Change profile Photo</button>
					</div>
				</div>
				<div className={style.forms}>
					<form onSubmit={(e) => handleUpdateName(e)} className={style.userNames}>
						<h3>Edit Username and name</h3>
						<label htmlFor="name">Name</label>
						<input
							onChange={(e) => setName(e.target.value)}
							value={name}
							type="text"
							id="name"
						/>
						<label htmlFor="username">Username</label>
						<input
							onChange={(e) => setUserName(e.target.value)}
							value={userName}
							type="text"
							id="username"
						/>
						<SubmitBtn>Submit</SubmitBtn>
					</form>
					<form onSubmit={(e) => handleDangerArea(e)}>
						<h3>Change passaword</h3>
						<InputPassword
							onChange={(e) => setOldPassword(e.target.value)}
							value={oldPassword}
							label="Old password"
						/>
						<InputPassword
							onChange={(e) => setNewPassword(e.target.value)}
							value={newPassword}
							label="New password"
						/>
						<InputPassword
							onChange={(e) => setConfirmNewPassword(e.target.value)}
							value={confirmNewPassword}
							label="Confirm password"
						/>
						<SubmitBtn type="submit">Update Password</SubmitBtn>
					</form>
				</div>
				<button className={style.delete} type="button">
					Delete account
				</button>
			</div>
		</main>
	);
};

export default Settings;
