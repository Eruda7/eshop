import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchProductDetail } from '../../store/slices/productDetailSlice'
import s from './ProductDetail.module.scss'
const ProductDetail: FC = () => {
	const dispatch = useAppDispatch()
	const { loading, detail } = useAppSelector(state => state.productDetail)
	const { id } = useParams()
	useEffect(() => {
		if (id) {
			dispatch(fetchProductDetail(id))
		}
	}, [id, dispatch])

	return (
		<>
			{loading && <Loader />}
			{detail && (
				<div className={s.detail}>
					<img src={detail.image} alt={detail.title} className={s.image} />
					<div className={s.content}>
						<h3 className={s.title}>{detail.title}</h3>
						<p className={s.description}>{detail.description}</p>
						<p className={s.price}>Price: ${detail.price}</p>
						<p className={s.category}>Category: {detail.category}</p>
						<div className={s.rating}>
							<span>Rating: {detail.rating.rate} ⭐</span>
							<span>({detail.rating.count} reviews)</span>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default ProductDetail
