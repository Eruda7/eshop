import { useNavigate } from 'react-router-dom'
import Loader from '../../../../components/Loader/Loader'
import { useAppSelector } from '../../../../store/hooks'
import s from './Categories.module.scss'
const Categories = () => {
	const { loading, category, error } = useAppSelector(state => state.category)
	const navigate = useNavigate()

	if (error) return <p>{error}</p>
	return (
		<div className={s.category_wrapper}>
			{loading && <Loader />}
			<ul className={s.categories}>
				{category?.categories?.map(cat => (
					<li
						key={cat}
						className={s.category}
						onClick={() =>
							navigate(`/products?category=${encodeURIComponent(cat)}`)
						}
					>
						{cat}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Categories
