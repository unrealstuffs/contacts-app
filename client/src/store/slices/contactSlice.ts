import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Contact from '../contact'

interface IContacts {
	id: number
	name: string
	phone: string
	email: string
}

interface IState {
	contacts: IContacts[]
	status: string | null
	error: string | null
}

const initialState: IState = { contacts: [], status: null, error: null }

export const getContacts = createAsyncThunk(
	'contacts/getContacts',
	async () => {
		try {
			const response = await axios.get('http://localhost:5000/contacts')

			if (!response) {
				throw new Error('Server Error!')
			}

			const data = await response.data

			return data
		} catch (error: any) {
			return error.message
		}
	}
)

export const addNewContact = createAsyncThunk(
	'contacts/addNewContact',
	async (contact: Omit<Contact, 'id'>, { rejectWithValue, dispatch }) => {
		try {
			const response = await axios.post(
				'http://localhost:5000/contacts',
				contact
			)

			if (!response) {
				throw new Error("Can't add contact. Server error.")
			}

			const data = await response.data
			dispatch(addContact(data))
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
)

export const updateContact = createAsyncThunk(
	'todos/updateContact',
	async (contact: Contact, { rejectWithValue, dispatch }) => {
		try {
			const response = await axios.patch(
				`http://localhost:5000/contacts/${contact.id}`,
				contact
			)

			if (!response) {
				throw new Error("Can't toggle status. Server error.")
			}

			const data = response.data

			dispatch(changeContact(data))
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
)

export const deleteContact = createAsyncThunk(
	'todos/deleteContact',
	async function (id: string, { rejectWithValue, dispatch }) {
		try {
			const response = await axios.delete(
				`http://localhost:5000/contacts/${id}`
			)

			if (!response) {
				throw new Error("Can't delete task. Server error.")
			}

			dispatch(removeContact({ id }))
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
			state.contacts.push(action.payload)
		},
		changeContact(state, action) {
			const {
				payload: { id, name, email, phone },
			} = action

			state.contacts = state.contacts.map(contact =>
				contact.id === id ? { ...contact, name, email, phone } : contact
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
			state.status = 'loading'
			state.error = null
		})
		builder.addCase(getContacts.fulfilled, (state, action) => {
			state.status = 'resolved'
			state.contacts = action.payload
		})
		builder.addCase(getContacts.rejected, state => {
			state.status = 'error'
			state.error = 'error'
		})
	},
})

const { addContact, changeContact, removeContact } = contactSlice.actions

export default contactSlice.reducer
