// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import { fakeStoreAPIs } from '../../axios'
// import { IData, INullable } from '../types'

// type IHomeState = {
// 	loading: boolean
// 	error: INullable<string>
// 	home: INullable<IData>
// }

// const initialState: IHomeState = {
// 	error: null,
// 	loading: false,
// 	home: null,
// }

// export const fetchCategories = createAsyncThunk<
// 	IData,
// 	void,
// 	{ rejectValue: string }
// >('home/fetchCategories', async (_, { rejectWithValue }) => {
// 	try {
// 		const res = await fakeStoreAPIs.getCategories()
// 		if (res.status !== 200) {
// 			return rejectWithValue('Failed to fetch categories')
// 		}
// 		console.log(res)

// 		return res.data
// 	} catch (error: unknown) {
// 		if (error instanceof Error) {
// 			return rejectWithValue(error.message)
// 		}
// 		return rejectWithValue('Ошибка categoriesSlice 34-строка')
// 	}
// })

// const categoriesSlice = createSlice({
// 	name: 'home',
// 	initialState,
// 	reducers: {},
// 	extraReducers: builder => {
// 		builder
// 			.addCase(fetchCategories.pending, state => {
// 				state.loading = true
// 				state.error = null
// 			})
// 			.addCase(fetchCategories.fulfilled, (state, action) => {
// 				state.home = action.payload
// 				state.loading = false
// 			})
// 			.addCase(fetchCategories.rejected, (state, action) => {
// 				if (action.payload) {
// 					state.error = action.payload
// 				}
// 				state.loading = false
// 			})
// 	},
// })

// export default categoriesSlice.reducer
