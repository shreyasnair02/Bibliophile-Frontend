import './style.scss'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '../../utils/PageWrapper'

export default function Login() {
	const [userAuth, setUserAuth] = useAuth()
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		await setUserAuth.signin()
		navigate('/')
	}

	return (
		<PageWrapper className="login">
			<h1>Login Page</h1>
			<form onSubmit={handleSubmit}>
				<input type="text" name="inputName" />
				<button type="submit">Submit</button>
			</form>
		</PageWrapper>
	)
}
