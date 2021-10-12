import React, { SVGProps, useState } from 'react';
import style from '../navItem.module.css';

interface props {
	icon: SVGProps<SVGElement>;
	children: React.ReactNode;
}

const NavDropDown = ({ icon, children }: props) => {
	const [open, setOpen] = useState(false);

	return (
		<li className={style.container} onClick={() => setOpen(!open)}>
			{icon}

			{open && <div className={style.dropOpen}>{children}</div>}
		</li>
	);
};

export default NavDropDown;
