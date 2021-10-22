import React, { FormEvent, useContext, useState } from 'react';
import style from './header.module.css';
import NavLinkItem from './navLinkItem/NavLinkItem';
import NavDropDown from './navDropDownItem/NavDropDown';
import logo from '../../images/instagram-logo.png';
import noUser from '../../images/no-user.jpg';
import { userInfo } from '../../App';
import { Link } from 'react-router-dom';
import { db, handleSignOut, storage } from '../../firebase/firebaseConfig';
import Input from '../form/Input';
import SubmitBtn from '../form/SubmitBtn/SubmitBtn';
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { collection, addDoc, updateDoc } from '@firebase/firestore';

const Header = () => {
	const [uploadOpen, setUploadOpen] = useState(false);
	const [description, setDescription] = useState('');
	const [place, setPlace] = useState('');
	const [mediaUrl, setMediaUrl] = useState('');

	const userData = useContext(userInfo);

	// set firestore post
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		uploadFirestore();
		resetForm();
	};

	const uploadFirestore = async () => {
		const newPostRef = await addDoc(collection(db, 'posts'), {
			liked: [],
			comments: [],
			postTime: new Date().getTime(),
			userUid: userData.uid,
			mediaUrl: mediaUrl,
			description: description,
			place: place,
		});
		const id = newPostRef.id;
		await updateDoc(newPostRef, {
			id: id,
		});
	};

	// upload a post media
	const uploadPostMedia = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.target;
		const file = (target.files as FileList)[0];
		const fileRef = ref(storage, `posts/${file.name}`);
		await uploadBytes(fileRef, file);
		const fileUrl = await getDownloadURL(fileRef);
		setMediaUrl(fileUrl);
	};

	const resetForm = () => {
		setUploadOpen(!uploadOpen);
		setMediaUrl('');
		setDescription('');
		setPlace('');
	};

	return (
		<div className={style.container}>
			{uploadOpen && (
				<div className={style.uploadContainer}>
					<form action="" onSubmit={(e) => handleSubmit(e)}>
						<input
							type="file"
							id="fileInput"
							accept="image/*"
							onChange={(e) => uploadPostMedia(e)}
							required
						/>
						<Input
							type="text"
							label="Post description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						<Input
							type="text"
							label="Post location"
							value={place}
							onChange={(e) => setPlace(e.target.value)}
						/>
						<SubmitBtn type="submit">Log in</SubmitBtn>
					</form>
				</div>
			)}
			<nav>
				<ul className={style.navBar}>
					<NavLinkItem
						icon={<img src={logo} alt="Instagram logo" />}
						to={`/feed/inbox/${userData.uid}`}
					/>
					<li className={style.search}>
						<input type="text" name="search" id="search" />
					</li>
					<li>
						<ul className={style.links}>
							<NavLinkItem
								iconActive={
									<svg
										color="#262626"
										fill="#262626"
										height="22"
										role="img"
										viewBox="0 0 48 48"
										width="22"
									>
										<path d="M45.5 48H30.1c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2.1-4.6-4.6-4.6s-4.6 2.1-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.6-.6 2.1 0l21.5 21.5c.3.3.4.7.4 1.1v23.5c.1.8-.6 1.5-1.4 1.5z"></path>
									</svg>
								}
								iconNot={
									<svg
										color="#262626"
										fill="#262626"
										height="22"
										role="img"
										viewBox="0 0 48 48"
										width="22"
									>
										<path d="M45.3 48H30c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2-4.6-4.6-4.6s-4.6 2-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.5-.6 2.1 0l21.5 21.5c.4.4.6 1.1.3 1.6 0 .1-.1.1-.1.2v22.8c.1.8-.6 1.5-1.4 1.5zm-13.8-3h12.3V23.4L24 3.6l-20 20V45h12.3V34.2c0-4.3 3.3-7.6 7.6-7.6s7.6 3.3 7.6 7.6V45z"></path>
									</svg>
								}
								to={`/feed/${userData.uid}`}
							/>
							<NavLinkItem
								iconActive={
									<svg
										color="#262626"
										fill="#262626"
										height="22"
										role="img"
										viewBox="0 0 48 48"
										width="22"
									>
										<path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l13.2 13c.5.4 1.1.6 1.7.3l16.6-8c.7-.3 1.6-.1 2 .5.4.7.2 1.6-.5 2l-15.6 9.9c-.5.3-.8 1-.7 1.6l4.6 19c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.5-.5.5-1.1.2-1.6z"></path>
									</svg>
								}
								iconNot={
									<svg
										color="#262626"
										fill="#262626"
										height="22"
										role="img"
										viewBox="0 0 48 48"
										width="22"
									>
										<path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
									</svg>
								}
								to={`/direct/inbox/${userData.uid}`}
							/>
							<NavLinkItem
								iconActive={
									<svg
										color="#262626"
										fill="#262626"
										height="22"
										role="img"
										viewBox="0 0 48 48"
										width="22"
									>
										<path d="M24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0zm12.2 13.8l-7 14.8c-.1.3-.4.6-.7.7l-14.8 7c-.2.1-.4.1-.6.1-.4 0-.8-.2-1.1-.4-.4-.4-.6-1.1-.3-1.7l7-14.8c.1-.3.4-.6.7-.7l14.8-7c.6-.3 1.3-.2 1.7.3.5.4.6 1.1.3 1.7zm-15 7.4l-5 10.5 10.5-5-5.5-5.5z"></path>
									</svg>
								}
								iconNot={
									<svg
										color="#262626"
										fill="#262626"
										height="22"
										role="img"
										viewBox="0 0 48 48"
										width="22"
									>
										<path d="M24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0zm0 45C12.4 45 3 35.6 3 24S12.4 3 24 3s21 9.4 21 21-9.4 21-21 21zm10.2-33.2l-14.8 7c-.3.1-.6.4-.7.7l-7 14.8c-.3.6-.2 1.3.3 1.7.3.3.7.4 1.1.4.2 0 .4 0 .6-.1l14.8-7c.3-.1.6-.4.7-.7l7-14.8c.3-.6.2-1.3-.3-1.7-.4-.5-1.1-.6-1.7-.3zm-7.4 15l-5.5-5.5 10.5-5-5 10.5z"></path>
									</svg>
								}
								to={`/explore/${userData.uid}`}
							/>

							<li className={style.upload} onClick={() => setUploadOpen(!uploadOpen)}>
								<svg
									color="#262626"
									fill="#262626"
									height="24"
									role="img"
									viewBox="0 0 48 48"
									width="24"
								>
									<path d="M31.8 48H16.2c-6.6 0-9.6-1.6-12.1-4C1.6 41.4 0 38.4 0 31.8V16.2C0 9.6 1.6 6.6 4 4.1 6.6 1.6 9.6 0 16.2 0h15.6c6.6 0 9.6 1.6 12.1 4C46.4 6.6 48 9.6 48 16.2v15.6c0 6.6-1.6 9.6-4 12.1-2.6 2.5-5.6 4.1-12.2 4.1zM16.2 3C10 3 7.8 4.6 6.1 6.2 4.6 7.8 3 10 3 16.2v15.6c0 6.2 1.6 8.4 3.2 10.1 1.6 1.6 3.8 3.1 10 3.1h15.6c6.2 0 8.4-1.6 10.1-3.2 1.6-1.6 3.1-3.8 3.1-10V16.2c0-6.2-1.6-8.4-3.2-10.1C40.2 4.6 38 3 31.8 3H16.2z"></path>
									<path d="M36.3 25.5H11.7c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h24.6c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z"></path>
									<path d="M24 37.8c-.8 0-1.5-.7-1.5-1.5V11.7c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v24.6c0 .8-.7 1.5-1.5 1.5z"></path>
								</svg>
							</li>
							<NavDropDown
								width={500}
								iconNot={
									<svg
										color="#262626"
										fill="#262626"
										height="22"
										role="img"
										viewBox="0 0 48 48"
										width="22"
									>
										<path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
									</svg>
								}
								iconActive={
									<svg
										color="#262626"
										fill="#262626"
										height="22"
										role="img"
										viewBox="0 0 48 48"
										width="22"
									>
										<path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
									</svg>
								}
							>
								<h1>adxnaoi</h1>
								<p>asxa</p>
							</NavDropDown>
							<NavDropDown
								width={230}
								iconNot={
									userData.profilePicture ? (
										<img
											className={style.profile}
											src={userData.profilePicture}
											alt="User profile"
										/>
									) : (
										<img className={style.profile} src={noUser} alt="No user" />
									)
								}
								iconActive={
									userData.profilePicture ? (
										<img
											className={style.profileActive}
											src={userData.profilePicture}
											alt="User profile"
										/>
									) : (
										<img className={style.profileActive} src={noUser} alt="No user" />
									)
								}
							>
								<div>
									<Link to="/profile">
										<svg
											color="#262626"
											fill="#262626"
											height="16"
											viewBox="0 0 32 32"
											width="16"
										>
											<path d="M16 0C7.2 0 0 7.1 0 16c0 4.8 2.1 9.1 5.5 12l.3.3C8.5 30.6 12.1 32 16 32s7.5-1.4 10.2-3.7l.3-.3c3.4-3 5.5-7.2 5.5-12 0-8.9-7.2-16-16-16zm0 29c-2.8 0-5.3-.9-7.5-2.4.5-.9.9-1.3 1.4-1.8.7-.5 1.5-.8 2.4-.8h7.2c.9 0 1.7.3 2.4.8.5.4.9.8 1.4 1.8-2 1.5-4.5 2.4-7.3 2.4zm9.7-4.4c-.5-.9-1.1-1.5-1.9-2.1-1.2-.9-2.7-1.4-4.2-1.4h-7.2c-1.5 0-3 .5-4.2 1.4-.8.6-1.4 1.2-1.9 2.1C4.2 22.3 3 19.3 3 16 3 8.8 8.8 3 16 3s13 5.8 13 13c0 3.3-1.2 6.3-3.3 8.6zM16 5.7c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 11c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"></path>
										</svg>
										<span>Profile</span>
									</Link>
								</div>
								<div>
									<button onClick={handleSignOut}>Log Out</button>
								</div>
							</NavDropDown>
						</ul>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Header;
