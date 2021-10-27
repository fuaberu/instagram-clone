import React from 'react';
import { Link } from 'react-router-dom';

const ProfilePost = (props: {
	to: string;
	mediaUrl: string | undefined;
	userName: any;
	place: any;
}) => {
	return (
		<Link to={props.to}>
			<img src={props.mediaUrl} alt={`by ${props.userName} in ${props.place}.`} />
		</Link>
	);
};

export default ProfilePost;
