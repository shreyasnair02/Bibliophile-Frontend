import useLocalStorage from './useLocalStorage'

export default function useAuth() {
	const [auth, setAuth] = useLocalStorage()
	const authInfo = {
		isAuthenticated: auth,
		signin(callback) {
			return new Promise((resolve) => {
				setAuth(true)
				setTimeout(() => {
					resolve(callback)
				}, 1000)
			})
		},
		signout(callback) {
			return new Promise((resolve) => {
				setAuth(false)
				resolve(callback)
			})
		},
	}
	return [
		authInfo.isAuthenticated,
		{ signin: authInfo.signin, signout: authInfo.signout },
	]
}
