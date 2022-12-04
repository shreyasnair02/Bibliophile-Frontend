import { useState } from 'react'

export default function useLocalStorage(keyName = 'user', defaultValue = null) {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const value = localStorage.getItem(keyName)
			if (!!value) {
				return JSON.parse(value)
			} else {
				localStorage.setItem(keyName, JSON.stringify(defaultValue))
			}
		} catch (err) {
			console.log(err)
		}
		return defaultValue
	})

	const setValue = (newVal) => {
		try {
			localStorage.setItem(keyName, JSON.stringify(newVal))
		} catch (err) {
			console.log(err)
		}
		setStoredValue(newVal)
	}

	return [storedValue, setValue]
}
