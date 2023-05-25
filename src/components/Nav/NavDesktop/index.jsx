import {
	IconBooks,
	IconBuildingStore,
	IconHome,
	IconLogin,
} from '@tabler/icons'
import { BsBookHalf } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
import uuid4 from 'uuid4'
import useAuth from '../../../hooks/useAuth'
import './style.scss'

const NavDesktop = () => {
	const iconConfig = {
		size: 24,
		color: 'currentColor',
	}

	const navConfig = {
		start: {
			className: 'nav__logo',
			to: '/',
			icon: <BsBookHalf {...iconConfig} />,
		},
		middle: [
			{ name: 'home', to: '/', icon: <IconHome {...iconConfig} /> },
			{
				name: 'bookshelf',
				to: '/bookshelf',
				icon: <IconBooks {...iconConfig} />,
			},
		],
		end: [
			{
				name: 'sell books',
				className: 'nav__btn',
				to: '/sellbook',
				icon: <IconBuildingStore {...iconConfig} />,
			},
			{
				name: 'Login',
				to: '/login',
				icon: <IconLogin {...iconConfig} />,
				className: 'nav__login',
			},
		],
	}

	return (
		<nav className="nav">
			{Object.keys(navConfig).map((key) => {
				const navItem = navConfig[key]
				return (
					<div className={`nav__${key}`} key={uuid4()}>
						{Array.isArray(navItem) ? (
							navItem.map((item) => <NavItem {...item} key={uuid4()} />)
						) : (
							<NavItem {...navItem} />
						)}
					</div>
				)
			})}
		</nav>
	)
}

const NavItem = ({ name, icon, className, to }) => {
	const [loggedIn] = useAuth()
	if (loggedIn && name === 'Login') return null
	const classNames = `nav__item ${className ? className : ''}`
	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				isActive ? `${classNames} active` : classNames
			}
		>
			<div className="nav__icon">{icon}</div>
			{name && <div className="nav__text">{name}</div>}
		</NavLink>
	)
}

export default NavDesktop
