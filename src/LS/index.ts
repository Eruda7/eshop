export const setLS = (key: string, value: string) => {
	localStorage.setItem(key, value)
}

export const getLS = (key: string) => {
	const data = localStorage.getItem(key)
	return data
}

export const removeFromLS = (key: string) => {
	localStorage.removeItem(key)
}
