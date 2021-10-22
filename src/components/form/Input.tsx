import React, { FC } from 'react';
import styles from './input.module.css';

interface inputProps {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
	type: string;
	label: string;
}
const Input: FC<inputProps> = (props) => {
	const inputFocus = {
		padding: '16px 8px 4px 8px',
		fontSize: '12px',
	};
	const labelFocus = { top: '3px', fontSize: '10px' };
	return (
		<div className={styles.container}>
			<input
				type={props.type}
				className={styles.input}
				id={props.type}
				value={props.value}
				style={props.value ? inputFocus : {}}
				onChange={props.onChange}
				autoComplete="new-password"
				required
			/>
			<label
				className={styles.label}
				style={props.value ? labelFocus : {}}
				htmlFor={props.type}
			>
				{props.label}
			</label>
		</div>
	);
};

export default Input;
