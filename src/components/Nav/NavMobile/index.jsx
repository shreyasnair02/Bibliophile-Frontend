import './style.scss'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import {
	IconBook,
	IconBooks,
	IconBuildingStore,
	IconHome,
	IconLogin,
} from '@tabler/icons'
import { IconMenu } from '@tabler/icons'
import { AnimatePresence } from 'framer-motion'
import useAuth from '../../../hooks/useAuth'
const NavMobile = () => {
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		const closeNav = (e) => {
			if (!e.target.classList.contains('mobile-nav__list')) {
				setIsOpen(false)
			}
		}
		window.addEventListener('click', closeNav)

		return () => {
			window.removeEventListener('click', closeNav)
		}
	}, [])

	const iconConfig = {
		size: 24,
		color: 'currentColor',
	}
	const navConfig = [
		{ name: 'home', to: '/', icon: <IconHome {...iconConfig} /> },
		{
			name: 'bookshelf',
			to: '/bookshelf',
			icon: <IconBooks {...iconConfig} />,
		},
		{
			name: 'sell books',
			className: 'mobile-nav__btn',
			to: '/sellbook',
			icon: <IconBuildingStore {...iconConfig} />,
		},
		{
			name: 'login',
			to: '/login',
			icon: <IconLogin {...iconConfig} />,
			className: 'mobile-nav__login',
		},
	]

	return (
		<nav className="mobile-nav">
			<div className="row">
				<NavLink to="/" className="mobile-nav__logo">
					<IconBook {...iconConfig} />
				</NavLink>
				<button
					className="mobile-nav__menu"
					onClick={(e) => {
						e.stopPropagation()
						setIsOpen(!isOpen)
					}}
				>
					<IconMenu {...iconConfig} />
				</button>
			</div>
			<AnimatePresence>
				{isOpen && <NavList config={navConfig} />}
			</AnimatePresence>
		</nav>
	)
}

const NavList = ({ config }) => {

	return (
		<motion.div
			initial={{ opacity: 0, y: '-20px' }}
			animate={{ opacity: 1, y: '0px' }}
			exit={{ opacity: 0, y: '-20px' }}
			transition={{ duration: 0.35, ease: 'backInOut' }}
			className="mobile-nav__list"
		>
			{config.map(({ name, to, icon, className }, idx) => {
				const classNames = `mobile-nav__item ${className ? className : ''}`
				const [loggedIn] = useAuth()
				if(name === 'login' && loggedIn) return null
				return (
					<NavLink
						to={to}
						key={idx}
						className={({ isActive }) =>
							isActive ? `${classNames} active` : classNames
						}
					>
						<div className="nav__icon">{icon}</div>
						{name && <div className="nav__text">{name}</div>}
					</NavLink>
				)
			})}
		</motion.div>
	)
}

export default NavMobile
