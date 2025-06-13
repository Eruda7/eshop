// components/Footer/Footer.tsx
import { FC } from 'react'
import s from './Footer.module.scss'

const Footer: FC = () => {
	return (
		<footer className={s.footer}>
			<p>© {new Date().getFullYear()} EShop. All rights reserved.</p>
		</footer>
	)
}

export default Footer
