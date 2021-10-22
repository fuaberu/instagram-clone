import React, { useContext, useEffect, useState } from 'react';
import style from './feedPage.module.css';
import StoriesBtn from '../../components/feed/storiesBtn/StoriesBtn';
import FeedPost from '../../components/feed/FeedPost/FeedPost';
import Suggestions from '../../components/feed/suggestions/Suggestions';
import { userInfo } from '../../App';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

export interface Post {
	mediaUrl: string;
	liked?: string[];
	description?: string;
	place?: string;
	comments?: { userUid: string; userName: string; value: string }[];
	postTime: number;
	userUid: string;
	currentUserUid: string;
	currentUserName: string;
	id: string;
}

const Feed = () => {
	const [posts, setPosts] = useState<Array<Post>>([]);
	const currentUser = useContext(userInfo);

	const updatePosts = async () => {
		let followersData = currentUser.following;
		if (followersData.length < 1) return;
		//get posts data
		setPosts([]);
		const q = query(collection(db, 'posts'), where('userUid', 'in', followersData));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			let data: any = doc.data();
			setPosts((posts) => [...posts, data]);
		});
	};

	useEffect(() => {
		updatePosts();
		// eslint-disable-next-line
	}, [currentUser]);

	return (
		<main className={style.feedMain}>
			<section className={style.mainContent}>
				<div className={style.storiesContainer}>
					<ul className={style.stories}>
						<li className={style.newStories}>
							<div>
								<img
									src={currentUser.profilePicture}
									alt={`${currentUser.displayName} profile`}
								/>
							</div>
							<p>Your Storie</p>
						</li>
						<StoriesBtn
							to="/stories"
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIbfDzNPtnPQF6u02N9c4z9QvRUPlIFGu91A&usqp=CAU"
							alt=" cscscs"
							userName="reven"
						/>
					</ul>
				</div>
				<div className={style.feedPosts}>
					{posts.length > 0
						? posts.map((el: Post, index: number) => {
								return (
									<FeedPost
										id={el.id}
										currentUserUid={currentUser.uid}
										currentUserName={currentUser.userName}
										userUid={el.userUid}
										mediaUrl={el.mediaUrl}
										liked={el.liked}
										description={el.description}
										place={el.place}
										comments={el.comments}
										postTime={el.postTime}
										key={index}
									/>
								);
						  })
						: null}
				</div>
			</section>
			<section className={style.suggestions}>
				<Suggestions />
			</section>
		</main>
	);
};

export default Feed;
