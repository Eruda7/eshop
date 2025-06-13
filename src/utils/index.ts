export const backUrl = import.meta.env.VITE_BACK_URL!

export const checkLinkToHTTPS = (link: string) => {
	if (link.startsWith('http') && !link.startsWith('https')) {
		return `https${link.slice(4)}`
	} else if (link.startsWith('/media')) {
		return backUrl + link
	} else {
		return link
	}
}

export const truncateWords = (html: string, wordLimit: number) => {
	const textOnly = html.replace(/<[^>]*>/g, '') // Убираем теги
	const words = textOnly.split(/\s+/) // Разбиваем по пробелам
	if (words.join(' ').length > wordLimit) {
		return words.join(' ').slice(0, wordLimit) + '...'
	} else {
		return words.join(' ')
	}
}

export const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	})
}
