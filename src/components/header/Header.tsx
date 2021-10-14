import React, { useContext } from 'react';
import style from './header.module.css';
import NavLinkItem from './navLinkItem/NavLinkItem';
import NavDropDown from './navDropDownItem/NavDropDown';
import logo from '../../images/instagram-logo.png';
import noUser from '../../images/no-user.jpg';
import { userInfo } from '../../App';
import { Link } from 'react-router-dom';
import { handleSignOut } from '../../firebase/firebaseConfig';

const Header = () => {
	const userData: any = useContext(userInfo);
	console.log(userData, 'header');

	return (
		<div className={style.container}>
			<nav>
				<ul className={style.navBar}>
					<NavLinkItem icon={<img src={logo} alt="Instagram logo" />} to="/" />
					<li className={style.search}>
						<input type="text" name="search" id="search" />
					</li>
					<div className={style.links}>
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
							to="/feed"
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
							to="/direct/inbox"
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
							to="/explore"
						/>
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
					</div>
				</ul>
			</nav>
		</div>
	);
};

export default Header;
