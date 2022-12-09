import './style.scss'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '../../utils/PageWrapper'
import { useState } from 'react'
import Loading from '../../components/Loading'

export default function Login() {
	const [_, setUserAuth] = useAuth()
	const navigate = useNavigate()
	const [loading, setLoading] = useState()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		await setUserAuth.signin()
		setLoading(false)
		navigate('/')
	}

	return (
		<PageWrapper className="login">
			{loading && <Loading />}
			<h1>Login Page</h1>
			<form onSubmit={handleSubmit}>
				<input type="text" name="inputName" />
				<button type="submit">Submit</button>
			</form>
		</PageWrapper>
	)
}
