import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './feedPost.module.css';
import { Post } from '../../../pages/feed/Feed';
import { doc, getDoc } from '@firebase/firestore';
import { db, updateComments, updateLiked } from '../../../firebase/firebaseConfig';

const FeedPost = (props: Post) => {
	const [timePassed, setTimePassed] = useState('');
	const [profile, setProfile] = useState('');
	const [userName, setUserName] = useState('');
	const [liked, setLiked] = useState(false);
	const [likedArray, setLikedArray] = useState<string[]>([]);
	const [comment, setComment] = useState('');
	const [commentsArray, setCommentsArray] = useState<
		{ userUid: string; userName: string; value: string }[]
	>([]);

	function postedTime() {
		const time = new Date().getTime();
		const resolution = time - props.postTime;
		const resolutionTimeDays = resolution / (1000 * 3600 * 24);

		if (resolutionTimeDays * 24 < 1) {
			setTimePassed('less than one hour ago');
		} else if (resolutionTimeDays * 24 >= 1 && resolutionTimeDays < 1) {
			setTimePassed(`${Math.floor(resolutionTimeDays * 24)} hours ago`);
		} else if (resolutionTimeDays <= 1 && resolutionTimeDays < 8) {
			setTimePassed(`${Math.floor(resolutionTimeDays)} days ago`);
		} else {
			setTimePassed(
				new Date(props.postTime).toLocaleDateString('en-US', {
					month: 'long',
					day: 'numeric',
				})
			);
		}
	}

	const getUserInfo = async () => {
		const docRef = doc(db, 'users', props.userUid);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			setProfile(docSnap.data().profilePicture);
			setUserName(docSnap.data().userName);
		} else {
			console.log('No such document!');
		}
	};

	//like function
	const handleLike = () => {
		if (!props.liked) return;
		setLikedArray(props.liked);
		if (props.liked.indexOf(props.currentUserUid) > -1) {
			setLiked(true);
		}
	};

	const handleLikeAction = async () => {
		if (liked) {
			setLiked(false);
			setLikedArray(() => likedArray.filter((item) => item !== props.currentUserUid));
		} else {
			setLiked(true);
			setLikedArray(() => [...likedArray, props.currentUserUid]);
		}
		//update like db
		await updateLiked(props.id, props.currentUserUid);
	};

	//comment functions
	const inicialComment = () => {
		if (!props.comments) return;
		setCommentsArray(props.comments);
	};

	const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('submit	');
		let updatedComments = {
			userUid: props.currentUserUid,
			userName: props.currentUserName,
			value: comment,
		};

		setCommentsArray(() => [...commentsArray, updatedComments]);
		setComment('');

		await updateComments(props.id, updatedComments);
	};

	useEffect(() => {
		postedTime();
		getUserInfo();
		handleLike();
		inicialComment();
	}, []);

	return (
		<div className={style.post}>
			<div className={style.postHeader}>
				<Link to={`/profile/${props.userUid}`}>
					<img src={profile} alt={`${userName} profile`} />
				</Link>
				<div>
					<h3>
						<Link to={`/profile/${props.userUid}`}>{userName}</Link>
					</h3>
					<h4>{props.place}</h4>
				</div>
			</div>
			<img
				src={props.mediaUrl}
				className={style.picture}
				alt={`by ${userName} in ${props.place}.`}
			/>
			<div className={style.description}>
				<button className={style.buttons} onClick={() => handleLikeAction()}>
					{liked ? (
						<svg
							color="#ed4956"
							fill="#ed4956"
							height="24"
							role="img"
							viewBox="0 0 48 48"
							width="24"
						>
							<path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
						</svg>
					) : (
						<svg
							color="#262626"
							fill="#262626"
							height="24"
							role="img"
							viewBox="0 0 48 48"
							width="24"
						>
							<path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
						</svg>
					)}
				</button>
				<Link to={`/post/${props.id}`} className={style.buttons}>
					<svg
						color="#262626"
						fill="#262626"
						height="24"
						role="img"
						viewBox="0 0 48 48"
						width="24"
					>
						<path d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"></path>
					</svg>
				</Link>

				{!likedArray || likedArray.length < 1 ? (
					<div className={style.liked}>
						<span>No likes</span>
					</div>
				) : (
					<div className={style.liked}>
						<span>{likedArray.length} likes</span>
					</div>
				)}
				<div className={style.userDescription}>
					<p>
						<Link to={`/profile/${props.userUid}`}>{userName}</Link> {props.description}
					</p>
				</div>
				{commentsArray.length > 2 ? (
					<div className={style.moreComments}>
						<Link to={`/post/${props.id}`}>View all {commentsArray.length} comments</Link>
					</div>
				) : null}
				{!props.comments || props.comments.length < 1 ? (
					<div className={style.moreComments}>No comments</div>
				) : (
					commentsArray.slice(0, 2).map((comment, index) => (
						<p key={index} className={style.commentShow}>
							<span className={style.userName}>
								<Link to={`/profile/${comment.userUid}`}>{comment.userName}</Link>
							</span>{' '}
							{comment.value}
						</p>
					))
				)}
				<p className={style.time}>{timePassed}</p>
			</div>
			<form action="" className={style.comment} onSubmit={(e) => handleComment(e)}>
				<input
					type="text"
					name="user-comment"
					id="user-comment"
					placeholder="Add a comment..."
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				/>
				<button type="submit">Post</button>
			</form>
		</div>
	);
};

export default FeedPost;
