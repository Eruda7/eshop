import { FC, useState } from 'react'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
	changeQuantity,
	clearCart,
	removeFromCart,
} from '../../store/slices/cartSlice'
import { scrollToTop } from '../../utils'
import s from './Cart.module.scss'

const Cart: FC = () => {
	const { items } = useAppSelector(state => state.cart)
	const dispatch = useAppDispatch()
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [address, setAddress] = useState('')

	const handleOrderSubmit = () => {
		scrollToTop()
		if (!name || !email || !address) {
			toast.error('Пожалуйста, заполните все поля для оформления заказа.')
			return
		}

		const order = {
			customer: { name, email, address },
			items,
			total: items.reduce((acc, item) => acc + item.price * item.quantity, 0),
			date: new Date().toISOString(),
		}

		console.log('Заказ оформлен:', order)
		toast.success('Заказ успешно оформлен!')
		dispatch(clearCart())

		setName('')
		setEmail('')
		setAddress('')
	}

	return (
		<div className='container'>
			{items.length === 0 ? (
				<p className={s.empty}>Корзина пуста </p>
			) : (
				<>
					{items.map(item => (
						<div key={item.id} className={s.cartItem}>
							<img src={item.image} alt={item.title} />
							<div className={s.info}>
								<h4>{item.title}</h4>
								<p>{item.price} $</p>
							</div>
							<div className={s.controls}>
								<div className={s.counter}>
									<button
										onClick={() =>
											dispatch(
												changeQuantity({
													id: item.id,
													quantity:
														item.quantity - 1 > 0 ? item.quantity - 1 : 1,
												})
											)
										}
									>
										{' '}
										-{' '}
									</button>
									<span>{item.quantity}</span>
									<button
										onClick={() => {
											dispatch(
												changeQuantity({
													id: item.id,
													quantity: item.quantity + 1,
												})
											)
										}}
									>
										{' '}
										+{' '}
									</button>
								</div>
								<button onClick={() => dispatch(removeFromCart(item.id))}>
									Удалить
								</button>
							</div>
						</div>
					))}

					<div className={s.total}>
						<h3>
							Общая сумма:{' '}
							{items
								.reduce((acc, item) => acc + item.price * item.quantity, 0)
								.toFixed(2)}{' '}
							$
						</h3>
						<button onClick={() => dispatch(clearCart())}>
							Очистить Корзину
						</button>
					</div>
					<div className={s.orderForm}>
						<h3>Оформление заказа</h3>
						<input
							type='text'
							placeholder='Ваше имя'
							value={name}
							onChange={e => setName(e.target.value)}
						/>
						<input
							type='email'
							placeholder='Email'
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
						<textarea
							placeholder='Адрес доставки'
							value={address}
							onChange={e => setAddress(e.target.value)}
						></textarea>
						<button onClick={handleOrderSubmit}>Оформить заказ</button>
					</div>
				</>
			)}
		</div>
	)
}

export default Cart
