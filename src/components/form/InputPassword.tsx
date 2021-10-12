import React, { FC, useState } from 'react';
import Input from './Input';
import style from './inputPassword.module.css';

interface inputProps {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
	label: string;
}

const InputPassword: FC<inputProps> = (props) => {
	const [show, setShow] = useState('Show');

	const showPassword = () => {
		if (show === 'Show') {
			setShow('Hide');
		} else {
			setShow('Show');
		}
	};
	return (
		<div className={style.container}>
			<div className={style.innerContainer}>
				<Input
					type={show === 'Hide' ? 'text' : 'password'}
					label={props.label}
					value={props.value}
					onChange={props.onChange}
				/>
				<button type="button" className={style.showBtn} onClick={showPassword}>
					{show}
				</button>
			</div>
		</div>
	);
};

export default InputPassword;
