import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fakeStoreAPIs } from '../../axios'
import { INullable, IProduct } from '../types'

type IProductsState = {
	loading: boolean
	error: INullable<string>
	products: INullable<IProduct[] | null>
}

const initialState: IProductsState = {
	error: null,
	loading: false,
	products: null,
}

export const fetchProducts = createAsyncThunk<
	IProduct[],
	void,
	{ rejectValue: string }
>('products/fetchProducts', async (_, { rejectWithValue }) => {
	try {
		const res = await fakeStoreAPIs.getProducts()
		if (res.status !== 200) {
			return rejectWithValue('Failed to fetch products')
		}

		// console.log(res)
		return res.data
	} catch (error: unknown) {
		if (error instanceof Error) {
			return rejectWithValue(error.message)
		}
		return rejectWithValue('Ошибка productsSlice 34-строка')
	}
})

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchProducts.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.products = action.payload
				state.loading = false
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				if (action.payload) {
					state.error = action.payload
				}
				state.loading = false
			})
	},
})

export default productsSlice.reducer
