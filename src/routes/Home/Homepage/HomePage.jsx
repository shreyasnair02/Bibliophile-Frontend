import React from 'react'
import { NavLink } from 'react-router-dom'
import heroImg1 from '../../../assets/hero-img.png'
import heroImg2 from '../../../assets/hero-img2.png'
import { IconBuildingStore } from '@tabler/icons'
import './style.scss'
export const HomePage = () => {
	return (
		<div className="home__container">
			<div className="home__container__sellbook">
				<NavLink to="/sellbook">
					<button className="nav__btn nav__link nav__action purbtn">
						<IconBuildingStore size={22} color="currentColor" />
						Sell Books
					</button>
				</NavLink>
			</div>
			<div className="home__container__welcome">
				<h3>paradise for book lovers</h3>
				<h1>Bibliophile</h1>
				<h2>
					<span id="content">Sharing knowledge has never been easier</span>{' '}
					<span>Find and sell used books at lowest rates.</span>
				</h2>
			</div>
			<div className="home__container__hero__container">
				<picture>
					<source srcSet={heroImg1} media="(min-width:600px)" />
					<img src={heroImg2} alt="Bibliophilia" className="hero__img" />
				</picture>
			</div>
		</div>
	)
}
