import { IconBook, IconBooks, IconBuildingStore, IconHome, IconLogin } from '@tabler/icons'
import { NavLink } from 'react-router-dom'
import './style.scss'

export default function Nav() {
	return (
		<nav className="nav">
			<div className="nav__logo">
				<NavLink to="/">
					<IconBook size={24} color="hsl(var(--text-100))" />
				</NavLink>
			</div>
			<ul className="nav__list">
				<li className="nav__item">
					<NavLink to="/" className="nav__link">
						<IconHome size={20} color="currentColor" /> Home
					</NavLink>
				</li>
				<li className="nav__item">
					<NavLink to="bookshelf" className="nav__link">
						<IconBooks size={20} color="currentColor" /> Bookshelf
					</NavLink>
				</li>
			</ul>
			<div className="nav__btn-group">
				<button className="nav__btn nav__link nav__action">
					<IconBuildingStore size={22} color="currentColor" />
					Sell Books
				</button>
				<NavLink to="/login" className="nav__btn">
					<IconLogin size={24} color="currentColor" />
				</NavLink>
			</div>
		</nav>
	)
}
