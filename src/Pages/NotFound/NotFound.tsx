import { Box, Button, Typography } from '@mui/material'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound: FC = () => {
	const navigate = useNavigate()
	return (
		<Box
			sx={{
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				textAlign: 'center',
				p: 2,
			}}
		>
			<Typography variant='h2' fontWeight={700}>
				404
			</Typography>
			<Typography variant='h5' mb={2}>
				Страница не найдена
			</Typography>
			<Button variant='contained' color='primary' onClick={() => navigate('/')}>
				На главную
			</Button>
		</Box>
	)
}

export default NotFound
