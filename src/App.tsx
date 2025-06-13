import { FC, useEffect } from 'react'
import Loader from './components/Loader/Loader'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { fetchByUserData, setTokenFromLS } from './store/slices/userSlice'

const App: FC = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		const token = localStorage.getItem('token') ?? ''
		dispatch(setTokenFromLS(token))
		dispatch(fetchByUserData())
	}, [dispatch])

	const { hydrated } = useAppSelector(state => state.user)
	if (!hydrated) return <Loader />

	return null
}

export default App
