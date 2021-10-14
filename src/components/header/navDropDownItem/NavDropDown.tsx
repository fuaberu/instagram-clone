import React, { SVGProps, useState } from 'react';
import style from '../navItem.module.css';

interface props {
	iconActive: SVGProps<SVGElement>;
	iconNot: SVGProps<SVGElement>;
	children: React.ReactNode;
	width: number;
	height?: number;
}

const NavDropDown = ({ iconActive, iconNot, children, width, height }: props) => {
	const [open, setOpen] = useState(false);

	return (
		<li className={style.container} onClick={() => setOpen(!open)}>
			{open ? iconActive : iconNot}

			{open && (
				<div className={style.openMenu} style={{ width: `${width}px` }}>
					{children}
				</div>
			)}
		</li>
	);
};

export default NavDropDown;
