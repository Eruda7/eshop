import axios from 'axios'
import { backUrl } from '../utils'

const instance = axios.create({
	baseURL: backUrl,
	headers: {
		'Content-Type': 'application/json',
	},
})

export const fakeStoreAPIs = {
	getProducts() {
		return instance.get('/products')
	},
	getCategories() {
		return instance.get('/products/categories')
	},
	getProductById(id: string) {
		return instance.get(`/products/${id}`)
	},
}
