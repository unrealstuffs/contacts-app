import { FC } from 'react'
import styles from './Search.module.scss'

interface ISearch {
	searchTerm: string
	setSearchTerm: (e: string) => void
}

const Search: FC<ISearch> = ({ searchTerm, setSearchTerm }) => {
	return (
		<div className={styles.search}>
			<input
				type='text'
				placeholder='Поиск...'
				value={searchTerm}
				onChange={e => setSearchTerm(e.currentTarget.value)}
			/>
		</div>
	)
}

export default Search
