import React from 'react';
import { Link } from 'react-router-dom';

interface LinkInterface {
	to: string;
	imgSrc: string;
}

const PostLink = (props: LinkInterface) => {
	return (
		<div>
			<Link to={props.to}>
				<img src={props.imgSrc} alt={`link to the page`} />
			</Link>
		</div>
	);
};

export default PostLink;
