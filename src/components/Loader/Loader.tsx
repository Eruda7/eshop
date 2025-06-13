import { FC } from 'react'
import s from './Loader.module.scss'
const Loader: FC = () => {
	return (
		<div className={s.card}>
			<div className={s.loader}>
				<p>loading</p>
				<div className={s.words}>
					<span className={s.word}>buttons</span>
					<span className={s.word}>forms</span>
					<span className={s.word}>switches</span>
					<span className={s.word}>cards</span>
					<span className={s.word}>buttons</span>
				</div>
			</div>
		</div>
	)
}

export default Loader
