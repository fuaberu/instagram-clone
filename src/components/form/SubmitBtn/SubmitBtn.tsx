import React from 'react';
import style from './submitBtn.module.css';

const SubmitBtn = (props: React.ComponentPropsWithoutRef<'button'>) => {
	return (
		<button type={props.type} className={style.logInBtn}>
			{props.children}
		</button>
	);
};

export default SubmitBtn;
