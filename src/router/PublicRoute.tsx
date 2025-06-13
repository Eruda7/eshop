// src/router/PublicRoute.tsx
import { FC, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Loader from '../components/Loader/Loader'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchByUserData, setTokenFromLS } from '../store/slices/userSlice'

const PublicRoute: FC = () => {
	const { token, hydrated } = useAppSelector(s => s.user)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (!hydrated) {
			const lsToken = localStorage.getItem('token') ?? ''
			dispatch(setTokenFromLS(lsToken))
			dispatch(fetchByUserData())
		}
	}, [hydrated, dispatch])

	if (!hydrated) return <Loader />
	if (token) return <Navigate to='/' replace />

	return <Outlet />
}

export default PublicRoute
