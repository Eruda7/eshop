import axios from 'axios'
import { ILoginData, IRegisterData } from '../store/types'

const instance = axios.create({
	baseURL: 'http://95.87.94.154:8888/api/',
	headers: { 'Content-Type': 'application/json' },
})

instance.interceptors.request.use(config => {
	const token = localStorage.getItem('token')
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

export const authAPI = {
	userRegister(data: IRegisterData) {
		return instance.post('user/registration/', data)
	},
	userLogin(data: ILoginData) {
		return instance.post('user/token/', data)
	},
	getUserData() {
		return instance.get('user/user_profile/profile/')
	},
}
