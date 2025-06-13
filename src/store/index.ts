import { configureStore, Middleware } from '@reduxjs/toolkit'

import cartSlice from './slices/cartSlice'
import categoriesSlice from './slices/categoriesSlice'
import productDetailSlice from './slices/productDetailSlice'
import productsSlice from './slices/productsSlice'
import userSlice from './slices/userSlice'

const saveCartToLocalStorage: Middleware = store => next => action => {
	const results = next(action)
	const state = store.getState()
	localStorage.setItem('cart', JSON.stringify(state.cart.items))
	return results
}

export const store = configureStore({
	reducer: {
		category: categoriesSlice,
		products: productsSlice,
		productDetail: productDetailSlice,
		cart: cartSlice,
		user: userSlice,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(saveCartToLocalStorage),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
