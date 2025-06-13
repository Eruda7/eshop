import { FC } from 'react'
import s from './HeadSection.module.scss'
import Slider from './Slider/Slider'
const HeadSection: FC = () => {
	return (
		<div className={s.hero}>
			<div className={s.hero__slider}>{<Slider />}</div>
			<div className={s.hero__side_banners}>
				<div className={s.item1}>1</div>
				<div className={s.item2}>2</div>
				<div className={s.item3}>3</div>
			</div>
		</div>
	)
}

export default HeadSection
