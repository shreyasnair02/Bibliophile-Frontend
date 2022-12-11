import React from 'react'
import heroImg from '../../../assets/hero-img.png'
import './style.scss'

export const HomePage = () => {
	return (
		<div className="home__container">
			<div className="home__container__welcome">
				<h3>paradise for book lovers</h3>
				<h1>Bibiliophile</h1>
				<h2>Sharing knowledge has never been easier</h2>
				<h2> Find and sell used books at lowest rates.</h2>
			</div>
			<div className="home__container__hero__container">
				<img src={heroImg} alt="Bibliophilia" className="hero__img" />
			</div>
		</div>
	)
}
