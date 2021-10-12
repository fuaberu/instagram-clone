import React, { SVGProps } from 'react';
import { Link } from 'react-router-dom';
import style from '../navItem.module.css';

interface props {
	to: string;
	icon: SVGProps<SVGElement>;
}

const NavLinkItem = ({ to, icon }: props) => {
	return (
		<li className={style.container}>
			<Link to={to}>{icon}</Link>
		</li>
	);
};

export default NavLinkItem;
