import '../index.scss'
import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Root() {
	const [user] = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (!user) {
			navigate('/login')
		}
	}, [])

	return (
		<>
			<Nav />
			<Outlet />
		</>
	)
}
