import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'
import { authAPI } from '../../axios/auth'
import { removeFromLS, setLS } from '../../LS'
import { ILoginData, IRegisterData, IUserProfile } from '../types'
import { INullable } from '../types/index'

type IUserState = {
	loading: boolean
	error: INullable<string>
	token: INullable<string>
	user: INullable<IUserProfile>
	hydrated: boolean
}

const initialState: IUserState = {
	loading: false,
	error: null,
	token: null,
	user: null,
	hydrated: false,
}

/* ───────── 1. регистрация ───────── */
export const fetchByAddNewUser = createAsyncThunk<
	string,
	IRegisterData,
	{ rejectValue: string }
>('user/register', async (data, { rejectWithValue }) => {
	try {
		const res = await authAPI.userRegister(data)
		if (res.status !== 201) throw new Error('Server error')
		return res.data.message as string
	} catch (e) {
		return rejectWithValue((e as Error).message)
	}
})

/* ───────── 2. логин ───────── */
export const fetchByLogin = createAsyncThunk<
	string,
	ILoginData,
	{ rejectValue: string }
>('user/login', async (data, { rejectWithValue }) => {
	try {
		const res = await authAPI.userLogin(data)
		if (res.status !== 200) throw new Error('Server error')
		return res.data.access as string
	} catch (e) {
		return rejectWithValue((e as Error).message)
	}
})

/* ───────── 3. профиль ───────── */
export const fetchByUserData = createAsyncThunk<
	IUserProfile,
	void,
	{ state: RootState; rejectValue: string }
>('user/profile', async (_, { getState, rejectWithValue }) => {
	if (!getState().user.token) return rejectWithValue('No token')
	try {
		const res = await authAPI.getUserData()
		if (res.status !== 200) throw new Error('Server error')
		return res.data as IUserProfile
	} catch (e) {
		return rejectWithValue((e as Error).message)
	}
})

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setTokenFromLS(state, action: PayloadAction<string>) {
			state.token = action.payload
			// state.hydrated = true
		},
		logOut(state) {
			removeFromLS('token')
			state.token = null
			state.user = null
			state.hydrated = true
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchByAddNewUser.rejected, (s, a) => {
			s.error = a.payload ?? null
		})

		builder.addCase(fetchByLogin.fulfilled, (s, a) => {
			s.token = a.payload
			setLS('token', a.payload)
			s.error = null
		})

		builder.addCase(fetchByUserData.fulfilled, (s, a) => {
			s.user = a.payload
			s.hydrated = true
		})

		builder.addCase(fetchByUserData.rejected, s => {
			s.hydrated = true
		})
	},
})

export const { setTokenFromLS, logOut } = userSlice.actions
export default userSlice.reducer
