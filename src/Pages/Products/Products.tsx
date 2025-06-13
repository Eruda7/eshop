import { FC, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchProducts } from '../../store/slices/productsSlice'
import { scrollToTop } from '../../utils'
import ProductCard from './ProductCard/ProductCard'
import s from './Products.module.scss'

const Products: FC = () => {
	const dispatch = useAppDispatch()
	const [searchParams] = useSearchParams()
	const searchQuery = searchParams.get('search') || ''
	const categoryFilter = searchParams.get('category') || ''
	const { products, loading } = useAppSelector(state => state.products)

	useEffect(() => {
		scrollToTop()
		if (!products) {
			dispatch(fetchProducts())
		}
	}, [dispatch, products])

	const filteredProducts = products?.filter(product => {
		const matchesSearch = product.title
			.toLowerCase()
			.includes(searchQuery.toLowerCase())
		const matchesFilter = categoryFilter
			? product.category === categoryFilter
			: true
		return matchesSearch && matchesFilter
	})
	return (
		<div className={`container ${s.products_wrapper}`}>
			{loading && <Loader />}
			{categoryFilter && (
				<h2 className={s.category_title}>Категория: {categoryFilter}</h2>
			)}
			<div className={s.products_wrapper}>
				{filteredProducts?.map(product => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	)
}

export default Products
