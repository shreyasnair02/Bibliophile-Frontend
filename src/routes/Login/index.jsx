import './style.scss'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '../../utils/PageWrapper'
import { useState } from 'react'
import Loading from '../../components/Loading'
import Input from '../../components/Input'

export default function Login() {
	const [_, setUserAuth] = useAuth()
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		await setUserAuth.signin()
		setLoading(false)
		navigate('/')
	}

	return (
		<PageWrapper className="login page">
			{loading && <Loading />}
			<h1>Sign In</h1>
			<form onSubmit={handleSubmit}>
				<Input type="email" name="email" placeholder="someone@gmail.com" />
				<Input type="password" name="password" placeholder="********" />
				<button>submit karo idhar</button>
			</form>
		</PageWrapper>
	)
}
