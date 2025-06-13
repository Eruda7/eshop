import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICartItem } from '../types'

const getInitialCart = (): ICartItem[] => {
	const saved = localStorage.getItem('cart')
	return saved ? JSON.parse(saved) : []
}

type CartState = {
	items: ICartItem[]
}

const initialState: CartState = {
	items: getInitialCart(),
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<ICartItem>) => {
			const item = state.items.find(
				(i: ICartItem) => i.id === action.payload.id
			)
			if (item) {
				item.quantity += action.payload.quantity
			} else {
				state.items.push(action.payload)
			}
		},
		removeFromCart: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter(
				(i: ICartItem) => i.id !== action.payload
			)
		},
		clearCart: state => {
			state.items = []
		},
		changeQuantity: (
			state,
			action: PayloadAction<{ id: number; quantity: number }>
		) => {
			const item = state.items.find(
				(i: ICartItem) => i.id === action.payload.id
			)
			if (item) item.quantity = action.payload.quantity
		},
	},
})

export const { addToCart, removeFromCart, clearCart, changeQuantity } =
	cartSlice.actions

export default cartSlice.reducer
