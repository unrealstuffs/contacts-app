import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface IContacts {
	id: number
	name: string
	phone: string
}

interface IState {
	contacts: IContacts[]
	loading: boolean
	error: string | null
}

const initialState: IState = { contacts: [], loading: false, error: null }

export const getContacts = createAsyncThunk(
	'contacts/getContacts',
	async () => {
		try {
			const response = await fetch('http://localhost:3001/contacts')

			if (!response) {
				throw new Error('Server Error!')
			}

			const data = await response.json()

			return data
		} catch (error: any) {
			console.log(error)
			return error.message
		}
	}
)

export const addNewContact = createAsyncThunk(
	'contacts/addNewContact',
	async (contact: Omit<IContacts, 'id'>, { rejectWithValue, dispatch }) => {
		try {
			const response = await fetch('http://localhost:3001/contacts', {
				method: 'POST',
				body: JSON.stringify(contact),
				headers: {
					'Content-Type': 'application/json',
				},
			})

			if (!response) {
				throw new Error("Can't add contact. Server error.")
			}

			const data = await response.json()
			dispatch(contactsActions.addContact(data))
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
)

export const updateContact = createAsyncThunk(
	'contacts/updateContact',
	async (contact: IContacts, { rejectWithValue, dispatch }) => {
		try {
			const response = await fetch(
				`http://localhost:3001/contacts/${contact.id}`,
				{
					method: 'PATCH',
					body: JSON.stringify(contact),
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)

			if (!response) {
				throw new Error("Can't change contact. Server error.")
			}

			const data = await response.json()

			dispatch(contactsActions.changeContact(data))
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
)

export const deleteContact = createAsyncThunk(
	'contacts/deleteContact',
	async function (id: number, { rejectWithValue, dispatch }) {
		try {
			const response = await fetch(
				`http://localhost:3001/contacts/${id}`,
				{ method: 'DELETE' }
			)

			if (!response) {
				throw new Error("Can't delete contact. Server error.")
			}

			dispatch(contactsActions.removeContact({ id }))
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
)

export const contactSlice = createSlice({
	name: 'contacts',
	initialState,
	reducers: {
		addContact(state, action) {
			state.contacts.unshift(action.payload)
		},
		changeContact(state, action) {
			console.log(action.payload)
			const {
				payload: { id, name, phone },
			} = action

			state.contacts = state.contacts.map(contact =>
				contact.id === id ? { ...contact, name, phone } : contact
			)
		},
		removeContact(state, action) {
			state.contacts = state.contacts.filter(
				contact => contact.id !== action.payload.id
			)
		},
	},
	extraReducers: builder => {
		builder.addCase(getContacts.pending, state => {
			state.loading = true
			state.error = null
		})
		builder.addCase(getContacts.fulfilled, (state, action) => {
			state.loading = false
			state.contacts = action.payload
		})
		builder.addCase(getContacts.rejected, state => {
			state.loading = false
			state.error = 'error'
		})
	},
})

export const contactsActions = contactSlice.actions
export const contactsReducer = contactSlice.reducer
