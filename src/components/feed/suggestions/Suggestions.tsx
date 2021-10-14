import React from 'react';
import style from './suggestions.module.css';

interface PropsSuggestions {
	src: string;
}

const Suggestions = (props: PropsSuggestions) => {
	return (
		<div>
			<div>
				<img src={props.src} alt="user profile" />
			</div>
		</div>
	);
};

export default Suggestions;
