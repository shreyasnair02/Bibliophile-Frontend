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
		let formData = new FormData(e.target)
		let formObj = {
			email: formData.get('email'),
			password: formData.get('password'),
		}
		setLoading(true)
		await setUserAuth.signin(formObj)
		setLoading(false)
		navigate('/')
	}

	return (
		<PageWrapper className="login page">
			{loading && <Loading />}
			<h1>Sign In</h1>
			<form onSubmit={handleSubmit}>
				<div className="field">
					<label>Email</label>
					<Input
						required
						type="email"
						name="email"
						placeholder="someone@gmail.com"
					/>
				</div>
				<div className="field">
					<label>Password</label>
					<Input
						required
						type="password"
						name="password"
						placeholder="********"
					/>
				</div>
				<button className="btn">Sign In</button>
			</form>
		</PageWrapper>
	)
}
