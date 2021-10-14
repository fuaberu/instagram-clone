import React from 'react';
import style from './feedPage.module.css';
import StoriesBtn from '../../components/feed/storiesBtn/StoriesBtn';
import FeedPost from '../../components/feed/FeedPost/FeedPost';

const Feed = () => {
	return (
		<main>
			<section className={style.storiesContainer}>
				<ul className={style.stories}>
					<StoriesBtn
						to="/stories"
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIbfDzNPtnPQF6u02N9c4z9QvRUPlIFGu91A&usqp=CAU"
						alt=" cscscs"
						userName="reven"
					/>
				</ul>
			</section>
			<section className={style.feedPosts}>
				<FeedPost
					profilePicture="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIbfDzNPtnPQF6u02N9c4z9QvRUPlIFGu91A&usqp=CAU"
					userName="reven"
					picture="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
					liked={['cscscs', 'cacasxca', 'asxasxax']}
					description="❤️ feliz dia das crianças ❤️"
					place="𝑼𝒏𝒂 𝒏𝒐𝒄𝒉𝒆,𝒖𝒏 𝒄𝒊𝒈𝒂𝒓𝒓𝒐 𝒚 𝒖𝒏 𝒄𝒂𝒇é."
					comments={[
						{ user: ' ak xka x', value: 'works' },
						{ user: ' ak xka x', value: 'works' },
						{ user: ' ak xka x', value: 'works' },
						{ user: ' ak xka x', value: 'works' },
					]}
					postTime={1631057404000}
				/>
			</section>
		</main>
	);
};

export default Feed;
