import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fakeStoreAPIs } from '../../axios'
import { INullable, IProductDetail } from '../types'

type IProductDetailState = {
	loading: boolean
	error: INullable<string>
	detail: INullable<IProductDetail | null>
}
const initialState: IProductDetailState = {
	error: null,
	loading: false,
	detail: null,
}

export const fetchProductDetail = createAsyncThunk<
	IProductDetail,
	string,
	{ rejectValue: string }
>('detail/fetchDetail', async (id, { rejectWithValue }) => {
	try {
		const res = await fakeStoreAPIs.getProductById(id)
		if (res.status !== 200) {
			return rejectWithValue('Failed to fetch product detail')
		}
		console.log(res)
		return res.data
	} catch (error: unknown) {
		if (error instanceof Error) {
			return rejectWithValue(error.message)
		}
		return rejectWithValue('Ошибка productDetailSlice')
	}
})

const productDetailSlice = createSlice({
	name: 'detail',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchProductDetail.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchProductDetail.fulfilled, (state, action) => {
				state.detail = action.payload
				state.loading = false
			})
			.addCase(fetchProductDetail.rejected, (state, action) => {
				if (action.payload) {
					state.error = action.payload
				}
				state.loading = false
			})
	},
})

export default productDetailSlice.reducer
