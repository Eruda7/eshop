import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Loader from './components/Loader/Loader'
import Cart from './Pages/Cart/Cart'
import Home from './Pages/Home/Home'
import Products from './Pages/Products/Products'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { fetchByUserData, setTokenFromLS } from './store/slices/userSlice'

// + другие страницы

export default function App() {
	const dispatch = useAppDispatch()

	useEffect(() => {
		const token = localStorage.getItem('token') ?? ''
		dispatch(setTokenFromLS(token))
		dispatch(fetchByUserData())
	}, [dispatch])

	const { hydrated } = useAppSelector(state => state.user)
	if (!hydrated) return <Loader />

	return (
		<Routes>
			<Route path='' element={<Layout />}>
				<Route index element={<Home />} />
				<Route path='products' element={<Products />} />
				<Route path='cart' element={<Cart />} />
			</Route>
		</Routes>
	)
}
