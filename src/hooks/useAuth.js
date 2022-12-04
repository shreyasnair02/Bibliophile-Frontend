import useLocalStorage from './useLocalStorage'

export default function useAuth() {
	const [auth, setAuth] = useLocalStorage()
	const authInfo = {
		isAuthenticated: auth,
		signin(callback) {
			setAuth(true)
			setTimeout(callback, 200)
		},
		signout(callback) {
			setAuth(false)
			setTimeout(callback, 200)
		},
	}
	return [
		authInfo.isAuthenticated,
		{ signin: authInfo.signin, signout: authInfo.signout },
	]
}
