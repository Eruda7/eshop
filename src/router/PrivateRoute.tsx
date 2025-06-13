import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'

const PrivateRoute: FC = () => {
	const token = useAppSelector(s => s.user.token)
	return token ? <Outlet /> : <Navigate to='/login' replace />
}

export default PrivateRoute
