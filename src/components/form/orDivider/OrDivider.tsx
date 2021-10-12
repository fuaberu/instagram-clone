import React from 'react';
import style from './orDivider.module.css'

const OrDivider = () => {
	return (
		<div className={style.orContainer}>
			<div className={style.line}></div>
			<div className={style.or}>OR</div>
			<div className={style.line}></div>
		</div>
	);
};

export default OrDivider;
