import useLocalStorage from './useLocalStorage'

export default function useAuth() {
	const [auth, setAuth] = useLocalStorage()
	const authInfo = {
		isAuthenticated: auth,
		signin(callback) {
			return new Promise((resolve) => {
				setAuth(true)
				setTimeout(() => {
					callback
					resolve()
				}, 1000)
			})
		},
		signout(callback) {
			return new Promise((resolve) => {
				setAuth(false)
				callback
				resolve()
			})
		},
	}
	return [
		authInfo.isAuthenticated,
		{ signin: authInfo.signin, signout: authInfo.signout },
	]
}
