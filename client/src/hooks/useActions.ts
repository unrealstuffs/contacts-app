import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { contactsActions } from '../store/slices/contactSlice'
import { userActions } from '../store/slices/userSlice'

const allActions = {
	...userActions,
	...contactsActions,
}

export const useActions = () => {
	const dispatch = useDispatch()

	return bindActionCreators(allActions, dispatch)
}
