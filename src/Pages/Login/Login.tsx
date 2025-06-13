// src/Pages/Login/Login.tsx
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
	FormControl,
	IconButton,
	Input,
	InputAdornment,
	InputLabel,
} from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchByLogin, fetchByUserData } from '../../store/slices/userSlice'
import '../Register/Register.scss'

const Login: FC = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)

	const { loading, error } = useAppSelector(s => s.user)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const location = useLocation()
	useEffect(() => {
		if (location.state?.fromRegister) {
			toast.success('Аккаунт успешно создан! Теперь войдите')
			navigate(location.pathname, { replace: true, state: {} })
		}
	}, [location.state, navigate])
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		dispatch(fetchByLogin({ username, password }))
			.unwrap()
			.then(() => {
				toast.success('Вы успешно вошли в аккаунт!')
				dispatch(fetchByUserData())
				navigate('/')
			})
			.catch(() => {
				toast.error('Пароль или логин неверны!')
			})
	}
	const handleClickShowPassword = () => setShowPassword(prev => !prev)
	const handleMouseDownPassword = (event: React.MouseEvent) =>
		event.preventDefault()

	return (
		<div className='login_form_wrapper'>
			<Link to='/' className='auth_home_btn'>
				На главную
			</Link>
			<form className='form' onSubmit={handleSubmit}>
				<p className='form-title'>Вход в&nbsp;аккаунт</p>

				{/* username */}
				<div className='input-container'>
					<input
						placeholder='Имя пользователя'
						autoComplete='username'
						value={username}
						onChange={e => setUsername(e.target.value)}
						required
					/>
					<span>
						<svg stroke='currentColor' viewBox='0 0 24 24' fill='none'>
							<path
								d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</span>
				</div>

				{/* password */}
				<FormControl sx={{ m: 1, width: '100%' }} variant='standard'>
					<InputLabel htmlFor='standard-adornment-password'>Пароль</InputLabel>
					<Input
						id='standard-adornment-password'
						type={showPassword ? 'text' : 'password'}
						value={password}
						onChange={e => setPassword(e.target.value)}
						autoComplete='current-password'
						endAdornment={
							<InputAdornment position='end'>
								<IconButton
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									aria-label={
										showPassword ? 'Скрыть пароль' : 'Показать пароль'
									}
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>

				<button className='submit' type='submit' disabled={loading}>
					Войти
				</button>

				<p className='signup-link'>
					Нет аккаунта? <Link to='/register'>Регистрация</Link>
				</p>

				{error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
			</form>
		</div>
	)
}

export default Login
