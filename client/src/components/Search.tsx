import { FC } from 'react'

const Search: FC<{
	searchTerm: string
	setSearchTerm: (arg: string) => void
}> = ({ searchTerm, setSearchTerm }) => {
	return (
		<div className='mt-6'>
			<input
				type='text'
				className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5'
				placeholder='Search'
				required
				value={searchTerm}
				onChange={(e: any) => setSearchTerm(e.target.value)}
			/>
		</div>
	)
}

export default Search
