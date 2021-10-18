import React, { useEffect, useState, useContext } from 'react';
import style from './suggestions.module.css';
import { query, orderBy, limit, collection, getDocs } from 'firebase/firestore';
import { db, handleSignOut } from '../../../firebase/firebaseConfig';
import { userInfo } from '../../../App';

const Suggestions = () => {
	const currentUser = useContext(userInfo);

	const [suggestions, setSuggstions] = useState<Array<object>>([]);
	async function getSuggestions() {
		setSuggstions([]);
		const usersRef = collection(db, 'users');
		const q = query(usersRef, orderBy('createdDate', 'asc'), limit(5));

		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			setSuggstions((suggestions) => [...suggestions, doc.data()]);
		});
	}
	useEffect(() => {
		getSuggestions();
	}, [currentUser]);

	console.log(suggestions, 'query stapshot');
	return (
		<div>
			<div className={style.current}>
				<img
					className={style.profileImage}
					src={currentUser.profilePicture}
					alt="user profile"
				/>
				<div>
					<h4>{currentUser.userName}</h4>
					<h5>{currentUser.displayName}</h5>
				</div>
				<button onClick={handleSignOut}>Log Out</button>
			</div>
			<h3 className={style.divider}>Suggestions For You</h3>
			{suggestions.length > 0
				? suggestions.map(({ profilePicture, userName }: any, index) => {
						return (
							<div key={index} className={style.flex}>
								<img
									className={style.suggestionImage}
									src={profilePicture}
									alt={`${userName} profile`}
								/>
								<h4>{userName}</h4>
								<button>Follow</button>
							</div>
						);
				  })
				: null}
		</div>
	);
};

export default Suggestions;
