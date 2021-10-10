import React, { FC, useState } from 'react';
import styles from './input.module.css';

interface inputProps {
	type: string;
	label: string;
	getText?: (text: string) => void;
}
const Input: FC<inputProps> = (props) => {
	const [text, setText] = useState('');

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
				value={text}
				style={text ? inputFocus : {}}
				onChange={(e) => {
					setText(e.target.value);
				}}
			/>
			<label className={styles.label} style={text ? labelFocus : {}} htmlFor={props.type}>
				{props.label}
			</label>
		</div>
	);
};

export default Input;
