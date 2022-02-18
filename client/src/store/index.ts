import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import contactReducer from './slices/contactSlice'

export const store = configureStore({
	reducer: {
		user: userReducer,
		contacts: contactReducer,
	},
})
