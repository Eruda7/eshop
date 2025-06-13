import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
	FormControl,
	IconButton,
	Input,
	InputAdornment,
	InputLabel,
} from '@mui/material'
import { FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchByAddNewUser } from '../../store/slices/userSlice'
import './Register.scss'

const Register: FC = () => {
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { loading, error } = useAppSelector(state => state.user)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		dispatch(fetchByAddNewUser({ email, username, password }))
			.unwrap()
			.then(() => {
				// toast.success('Аккаунт успешно создан! Теперь войдите')
				navigate('/login', { state: { fromRegister: true } })
			})
			.catch(() => {})
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
				<p className='form-title'>Создайте аккаунт</p>

				<div className='input-container'>
					<input
						type='text'
						placeholder='Введите имя пользователя'
						value={username}
						onChange={e => setUsername(e.target.value)}
						required
					/>
					<span>
						<svg
							stroke='currentColor'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
								strokeWidth='2'
								strokeLinejoin='round'
								strokeLinecap='round'
							></path>
						</svg>
					</span>
				</div>

				<div className='input-container'>
					<input
						type='email'
						placeholder='Введите email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>
					<span>
						<svg
							stroke='currentColor'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
								strokeWidth='2'
								strokeLinejoin='round'
								strokeLinecap='round'
							></path>
						</svg>
					</span>
				</div>

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
					Зарегистрироваться
				</button>

				<p className='signup-link'>
					Уже есть аккаунт? <Link to='/login'>Войти</Link>
				</p>
				{error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
			</form>
		</div>
	)
}

export default Register
