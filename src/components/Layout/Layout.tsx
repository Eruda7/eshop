import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'

export default function Layout() {
	return (
		<Box sx={{ display: 'flex', minHeight: '100vh' }}>
			<Box
				sx={{
					width: 160,
					bgcolor: '#f4f4f4',
					borderRight: '1px solid #ddd',
					position: 'sticky',
					top: 0,
					height: '100vh',
					p: 2,
				}}
			>
				<Sidebar />
			</Box>

			<Box
				sx={{
					flexGrow: 1,
					display: 'flex',
					flexDirection: 'column',
					minHeight: '100vh',
				}}
			>
				<Header />
				<Box sx={{ flexGrow: 1, minHeight: '70vh' }}>
					<Outlet />
				</Box>
				<Footer />
			</Box>
		</Box>
	)
}
