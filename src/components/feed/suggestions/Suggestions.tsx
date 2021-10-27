import React, { useEffect, useState, useContext } from 'react';
import style from './suggestions.module.css';
import { query, orderBy, collection, getDocs } from 'firebase/firestore';
import { db, handleFollow, handleSignOut } from '../../../firebase/firebaseConfig';
import { userInfo } from '../../../App';
import { Link } from 'react-router-dom';

const Suggestions = () => {
	const currentUser = useContext(userInfo);

	const [suggestions, setSuggstions] = useState<Array<object>>([]);
	async function getSuggestions() {
		setSuggstions([]);
		const usersRef = collection(db, 'users');
		const q = query(usersRef, orderBy('createdDate', 'asc'));

		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			if (
				doc.data().uid !== currentUser.uid &&
				!currentUser.following.includes(doc.data().uid) &&
				suggestions.length < 6
			) {
				setSuggstions((suggestions) => [...suggestions, doc.data()]);
			}
		});
	}
	useEffect(() => {
		getSuggestions();
	}, [currentUser]);

	const handleFollowing = (followUid: string) => {
		setSuggstions(suggestions.filter((el: any) => el.uid !== followUid));
	};

	return (
		<div>
			<div className={style.current}>
				<Link to={`/profile/${currentUser.uid}`}>
					<img
						className={style.profileImage}
						src={currentUser.profilePicture}
						alt="user profile"
					/>
				</Link>
				<div>
					<Link to={`/profile/${currentUser.uid}`}>
						<h4>{currentUser.userName}</h4>
					</Link>
					<h5>{currentUser.displayName}</h5>
				</div>
				<button onClick={handleSignOut}>Log Out</button>
			</div>
			<h3 className={style.divider}>Suggestions For You</h3>
			{suggestions.length > 0
				? suggestions.map(({ profilePicture, userName, uid }: any, index) => {
						return (
							<div key={index} className={style.flex}>
								<Link to={`/profile/${uid}`}>
									<img
										className={style.suggestionImage}
										src={profilePicture}
										alt={`${userName} profile`}
									/>
								</Link>
								<Link to={`/profile/${uid}`}>
									<h4>{userName}</h4>
								</Link>
								<button
									onClick={() => {
										handleFollow(currentUser.uid, uid);
										handleFollowing(uid);
									}}
								>
									Follow
								</button>
							</div>
						);
				  })
				: null}
		</div>
	);
};

export default Suggestions;
