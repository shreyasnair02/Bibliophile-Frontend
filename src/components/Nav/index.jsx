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
	return (
		<nav className="nav">
			<div className="nav__logo">
				<NavLink to="/">
					<IconBook size={24} color="hsl(var(--text-100))" />
				</NavLink>
			</div>
			<NavList navItems={navItems} />
			<div className="nav__btn-group">
				<NavLink to="/sellbook">
					<button className="nav__btn nav__link nav__action">
						<IconBuildingStore size={22} color="currentColor" />
						Sell Books
					</button>
				</NavLink>
				<NavLink to="/login" className="nav__btn">
					<IconLogin size={24} color="currentColor" />
				</NavLink>
			</div>
		</nav>
	)
}

function NavList({ navItems }) {
	return (
		<ul className="nav__list">
			{navItems.map((navItem, idx) => (
				<li key={idx}>
					<NavLink
						to={navItem.to}
						className={({ isActive }) =>
							isActive ? 'nav__link nav__link--active' : 'nav__link'
						}
					>
						{navItem.icon} {navItem.text}
					</NavLink>
				</li>
			))}
		</ul>
	)
}
