import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fakeStoreAPIs } from '../../axios'
import { IData, INullable } from '../types'

type ICategoryState = {
	loading: boolean
	error: INullable<string>
	category: INullable<IData>
}

const initialState: ICategoryState = {
	error: null,
	loading: false,
	category: null,
}

export const fetchCategories = createAsyncThunk<
	IData,
	void,
	{ rejectValue: string }
>('category/fetchCategories', async (_, { rejectWithValue }) => {
	try {
		const cashed = localStorage.getItem('categories')
		if (cashed) {
			return {
				categories: JSON.parse(cashed),
				products: null,
				productDetail: null,
			}
		}
		const res = await fakeStoreAPIs.getCategories()
		if (res.status !== 200) {
			return rejectWithValue('Failed to fetch categories')
		}
		// console.log(res)
		localStorage.setItem('categories', JSON.stringify(res.data))

		return { categories: res.data, products: null, productDetail: null }
	} catch (error: unknown) {
		if (error instanceof Error) {
			return rejectWithValue(error.message)
		}
		return rejectWithValue('Ошибка categorySlice')
	}
})

const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchCategories.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchCategories.fulfilled, (state, action) => {
				state.category = action.payload
				state.loading = false
			})
			.addCase(fetchCategories.rejected, (state, action) => {
				if (action.payload) {
					state.error = action.payload
				}
				state.loading = false
			})
	},
})

export default categorySlice.reducer
