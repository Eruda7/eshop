import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Cart from '../Pages/Cart/Cart'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'
import NotFound from '../Pages/NotFound/NotFound'
import ProductDetail from '../Pages/ProductDetail/ProductDetail'
import Products from '../Pages/Products/Products'
import Register from '../Pages/Register/Register'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

export const router = createBrowserRouter(
	[
		{
			element: <PublicRoute />,
			children: [
				{ path: '/login', element: <Login /> },
				{ path: '/register', element: <Register /> },
			],
		},

		{
			path: '/',
			element: <App />,
			children: [
				{ index: true, element: <Home /> },
				{ path: 'products', element: <Products /> },
				{ path: 'products/:id', element: <ProductDetail /> },

				{
					element: <PrivateRoute />,
					children: [{ path: 'cart', element: <Cart /> }],
				},
				{ path: '*', element: <NotFound /> },
			],
		},
	],
	{
		basename: '/eshop',
	}
)
