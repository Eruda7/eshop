import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

import { fetchCategories } from '../../store/slices/categoriesSlice'
import { scrollToTop } from '../../utils'
import Categories from './Sections/Categories/Categories'

const Home: FC = () => {
	const dispatch = useAppDispatch()
	const { category } = useAppSelector(state => state.category)

	useEffect(() => {
		scrollToTop()
		if (!category) {
			dispatch(fetchCategories())
		}
		// dispatch(fetchCategories())
	}, [dispatch])

	return (
		<div>
			{/* <HeadSection /> */}
			<Categories />
		</div>
	)
}

export default Home
