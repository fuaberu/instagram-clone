import React from 'react';
import { Link } from 'react-router-dom';
import style from './storiesBtn.module.css';

interface stories {
	to: string;
	src: string;
	alt: string;
	userName?: string;
}

const StoriesBtn = ({ to, src, alt, userName }: stories) => {
	return (
		<li className={style.stories}>
			<button>
				<Link to={to}>
					<img className={style.picture} src={src} alt={alt} />
				</Link>
			</button>
			{userName && <p>{userName}</p>}
		</li>
	);
};

export default StoriesBtn;
