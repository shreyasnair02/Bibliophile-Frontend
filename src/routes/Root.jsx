import '../index.scss'
import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

export default function Root() {
	const [user] = useAuth()
	const navigate = useNavigate()
	const location = useLocation()

	useLayoutEffect(() => {
		if (!user) {
			navigate('/login')
		}
	}, [])

	return (
		<>
			<Nav />
			<AnimatePresence location={location.pathname}>
				<Outlet />
			</AnimatePresence>
		</>
	)
}
