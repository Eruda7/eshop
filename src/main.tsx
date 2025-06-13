import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './index.css'
import { router } from './router/router.tsx'
import './SCSS/global.scss'
import { store } from './store/index.ts'

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<ToastContainer position='top-left' autoClose={2000} />
		<RouterProvider router={router} />
	</Provider>
)
