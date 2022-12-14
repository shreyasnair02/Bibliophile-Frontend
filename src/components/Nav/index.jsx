import { useState } from 'react'
import { IconMenu } from '@tabler/icons'
import {
	IconBook,
	IconBooks,
	IconBuildingStore,
	IconHome,
	IconLogin,
} from '@tabler/icons'
import { NavLink } from 'react-router-dom'
import './style.scss'

export default function Nav() {
	const navItems = [
		{
			text: 'Home',
			to: '/',
			icon: <IconHome size={20} color="currentColor" />,
		},
		{
			text: 'Bookshelf',
			to: '/bookshelf',
			icon: <IconBooks size={20} color="currentColor" />,
		},
	]

	const [menuBool, setMenu] = useState(true)

	window.addEventListener('resize', () => {
		if (window.innerWidth > 640) {
			setMenu(true)
		} else {
			setMenu(false)
		}
	})

	return (
		<nav className="nav">
			<div className="nav__logo">
				<NavLink to="/">
					<IconBook size={24} color="hsl(var(--text-100))" />
				</NavLink>
			</div>
			<NavList navItems={navItems} className={menuBool ? null : 'hidden'} />
			<div className={`nav__btn-group ${menuBool ? null : 'hidden'}`}>
				<NavLink to="/sellbook" tabIndex="-1">
					<button className="nav__btn nav__link nav__action">
						<IconBuildingStore size={22} color="currentColor" />
						Sell Books
					</button>
				</NavLink>
				<NavLink
					to="/login"
					className={({ isActive }) =>
						isActive ? 'nav__btn active' : 'nav__btn'
					}
				>
					<IconLogin size={24} color="currentColor" />
				</NavLink>
			</div>
			<button className="nav__menu" onClick={() => setMenu(!menuBool)}>
				<IconMenu size={24} color="currentColor" />
			</button>
		</nav>
	)
}

function NavList({ navItems, className }) {
	return (
		<ul className={`nav__list ${className}`}>
			{navItems.map(({ to, icon, text }, idx) => (
				<NavLink
					key={idx}
					to={to}
					className={({ isActive }) =>
						isActive ? 'nav__link nav__link--active' : 'nav__link'
					}
				>
					{icon} {text}
				</NavLink>
			))}
		</ul>
	)
}
