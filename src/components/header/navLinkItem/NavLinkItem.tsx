import React, { SVGProps } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import style from '../navItem.module.css';

interface props {
	to: string;
	iconActive?: SVGProps<SVGElement>;
	iconNot?: SVGProps<SVGElement>;
	icon?: SVGProps<SVGElement>;
}

const NavLinkItem = ({ to, iconActive, iconNot, icon }: props) => {
	const location = useLocation();
	return (
		<li className={style.container}>
			<NavLink to={to} activeClassName={style.selected}>
				{icon}
				{location.pathname === to ? iconActive : iconNot}
			</NavLink>
		</li>
	);
};

export default NavLinkItem;
