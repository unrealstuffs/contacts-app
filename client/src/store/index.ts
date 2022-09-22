import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { contactsReducer } from './slices/contactSlice'

import { userReducer } from './slices/userSlice'

const rootReducer = combineReducers({
	user: userReducer,
	contacts: contactsReducer,
})

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['contacts'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}),
})

export const persistor = persistStore(store)

export type TypeRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
