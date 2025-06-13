export type INullable<T> = T | null

// ===== Products =====
export type IProduct = {
	id: number
	title: string
	price: number
	category: string
	description?: string
	image?: string
}

// ===== Product detail =====
export type IProductDetail = {
	id: number
	title: string
	price: number
	description: string
	category: string
	image: string
	rating: {
		rate: number
		count: number
	}
}

// ===== Cart =====
export type ICartItem = {
	id: number
	title: string
	price: number
	image?: string
	quantity: number
}

// ===== IData =====
export type IData = {
	categories: INullable<string[]>
	products: INullable<IProduct[]>
	productDetail: INullable<IProductDetail>
}

// ===== Auth =====
// store/types.ts
export interface IRegisterData {
	username: string
	email: string
	password: string
}

export interface ILoginData {
	username: string
	password: string
}

export interface IUserProfile {
	id: number
	username: string
	email: string
}
