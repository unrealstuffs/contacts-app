import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Contacts from '../components/Contacts/Contacts'
import Form from '../components/Form/Form'
import Header from '../components/Header/Header'
import Search from '../components/Search/Search'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { AppDispatch } from '../store'
import {
	addNewContact,
	getContacts,
	IContacts,
	updateContact,
} from '../store/slices/contactSlice'
import Layout from '../ui/Layout/Layout'

const ContactScreen = () => {
	const { accessToken } = useTypedSelector(state => state.user)
	const { contacts, loading, error } = useTypedSelector(
		state => state.contacts
	)
	const dispatch = useDispatch<AppDispatch>()

	const [searchTerm, setSearchTerm] = useState('')
	const [currentId, setCurrentId] = useState<number | null>(null)
	const [contactsData, setContactsData] = useState<IContacts[]>([])

	const [fetchLoading, setFetchLoading] = useState(false)

	useEffect(() => {
		dispatch(getContacts())
	}, [dispatch])

	const addContactHandler = (name: string, phone: string) => {
		setFetchLoading(true)
		if (currentId) {
			dispatch(updateContact({ id: currentId, name, phone })).then(() => {
				setFetchLoading(false)
				setCurrentId(null)
			})
		} else {
			dispatch(addNewContact({ name, phone })).then(() =>
				setFetchLoading(false)
			)
		}
	}

	useEffect(() => {
		setContactsData(contacts)
		const filteredData = contacts.filter((contact: IContacts) =>
			contact.name.toLowerCase().includes(searchTerm.toLowerCase())
		)
		setContactsData(filteredData)
	}, [contacts, searchTerm])

	return (
		<>
			{!accessToken && <Navigate to='/login' replace={true} />}
			<Header />
			<Layout>
				<Form
					id={currentId}
					submit={addContactHandler}
					fetchLoading={fetchLoading}
				/>
				<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
				<Contacts
					setCurrentId={setCurrentId}
					contacts={contactsData}
					loading={loading}
					error={error}
				/>
			</Layout>
		</>
	)
}

export default ContactScreen
