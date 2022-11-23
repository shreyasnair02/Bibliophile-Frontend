import { NavLink } from 'react-router-dom'

export default function Nav() {
	return (
		<nav className='nav'>
			<div className="nav__logo"></div>
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
