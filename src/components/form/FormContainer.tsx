import React, { SVGProps } from 'react';
import style from './formContainer.module.css';

interface formContainer {
	children: React.ReactNode;
	img?: SVGProps<SVGElement>;
	alt?: string;
}

const FormContainer = ({ img, alt, children }: formContainer) => {
	return (
		<div className={style.container}>
			{img && img}
			<div className={style.wrapper}>{children}</div>
		</div>
	);
};

export default FormContainer;
