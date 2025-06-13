import { TextField } from '@mui/material'
import { FC, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { logOut } from '../../store/slices/userSlice'
import './Header.scss'

const Header: FC = () => {
	const [query, setQuery] = useState('')
	const navigate = useNavigate()

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault()
		if (query.trim()) {
			navigate(`/products?search=${query}`)
		}
	}

	// ===== auth =====
	const { token, user } = useAppSelector(state => state.user)
	const dispatch = useAppDispatch()

	return (
		<header className='main-header'>
			<NavLink to='/' className='logo-link'>
				EShop
			</NavLink>

			<div className='header_form'>
				<TextField
					id='search'
					label='Поиск...'
					size='small'
					value={query}
					variant='outlined'
					onChange={e => setQuery(e.target.value)}
					autoComplete='off'
					sx={{
						'& .MuiOutlinedInput-root': {
							'& fieldset': {
								borderColor: 'gray',
							},
							'&:hover fieldset': {
								borderColor: 'white',
							},
							'&.Mui-focused fieldset': {
								borderColor: 'white',
							},
						},
						'& label': {
							backgroundColor: 'transparent', // ← Убираем белый фон
							padding: '0 4px',
						},
					}}
				/>

				<button className='header_search_btn' onClick={handleSearch}>
					Поиск
				</button>
			</div>
			{token ? (
				<>
					<span>{user?.username}</span>
					<button
						onClick={() => {
							dispatch(logOut())
							toast.info('Вы вышли из аккаунта')
						}}
					>
						Выйти
					</button>
				</>
			) : (
				<>
					<NavLink className='header_auth_btn header_login' to='/login'>
						<span>Войти</span>
					</NavLink>
					<NavLink className='header_auth_btn header_register' to='/register'>
						<span>Регистрация</span>
					</NavLink>{' '}
				</>
			)}
		</header>
	)
}

export default Header
