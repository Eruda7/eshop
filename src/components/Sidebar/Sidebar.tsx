import HomeIcon from '@mui/icons-material/Home'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import StoreIcon from '@mui/icons-material/Store'
import {
	Badge,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'

const navItems = [
	{ path: '/', label: 'Главная', icon: <HomeIcon /> },
	{ path: '/products', label: 'Товары', icon: <StoreIcon /> },
	{ path: '/cart', label: 'Корзина', icon: <ShoppingCartIcon /> },
]

export default function Sidebar() {
	const totalItems = useAppSelector(s =>
		s.cart.items.reduce((sum, item) => sum + item.quantity, 0)
	)

	return (
		<List>
			{navItems.map(({ path, label, icon }) => {
				const isCart = path === '/cart'
				return (
					<ListItem key={path} disablePadding>
						<NavLink
							to={path}
							style={{ textDecoration: 'none', width: '100%' }}
						>
							<ListItemButton sx={{ px: 0 }}>
								<ListItemIcon>
									{isCart ? (
										<Badge badgeContent={totalItems} color='error'>
											{icon}
										</Badge>
									) : (
										icon
									)}
								</ListItemIcon>
								<ListItemText primary={label} />
							</ListItemButton>
						</NavLink>
					</ListItem>
				)
			})}
		</List>
	)
}
