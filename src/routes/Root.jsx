import '../index.scss'
import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav'
import { AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

export default function Root() {
	const location = useLocation()

	return (
		<>
			<Nav />
			<AnimatePresence location={location.pathname} initial={false}>
				<Outlet />
			</AnimatePresence>
		</>
	)
}
