import { useEffect, useState } from 'react'
import NavDesktop from './NavDesktop'
import NavMobile from './NavMobile'

const Nav = () => {
	const [nav, setNav] = useState(<NavDesktop />)
	useEffect(() => {
		setNav(window.innerWidth > 750 ? <NavDesktop /> : <NavMobile />)
		const handleResize = () => {
			setNav(window.innerWidth > 750 ? <NavDesktop /> : <NavMobile />)
		}
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])
	return nav
}

export default Nav
