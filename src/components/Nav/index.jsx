import { IconBook } from '@tabler/icons'
import { NavLink } from 'react-router-dom'
import './style.scss'

export default function Nav() {
	return (
		<nav className='nav'>
			<div className="nav__logo">
				<IconBook size={24} color="hsl(var(--text-100))" />
			</div>
			<ul className='nav__list'>
				<li className='nav__item'>
					<NavLink to="/">Home</NavLink>
				</li>
				<li className='nav__item'>
					<NavLink to="bookshelf">Bookshelf</NavLink>
				</li>
				{/* <li>Profile</li> */}
			</ul>
			<button className='nav__btn'>Sell Books</button>
		</nav>
	)
}
