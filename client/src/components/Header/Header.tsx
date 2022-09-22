import { Link, useNavigate } from 'react-router-dom'
import { useActions } from '../../hooks/useActions'

import styles from './styles.module.scss'

const Header = () => {
	const navigate = useNavigate()
	const { removeUser } = useActions()

	const logoutHandler = () => {
		removeUser()
		navigate('/login')
	}

	return (
		<div className={styles.header}>
			<div className={styles.logo}>Contacts App</div>
			<div className={styles.actions}>
				<Link to='/login' onClick={logoutHandler}>
					Выйти
				</Link>
			</div>
		</div>
	)
}

export default Header
