import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import ContactList from '../components/ContactList'
import Search from '../components/Search'
import useAuth from '../hooks/useAuth'
import Layout from '../layout'
import Contact from '../store/contact'
import { getContacts } from '../store/slices/contactSlice'

const Contacts = () => {
	const { isAuth } = useAuth()
	const dispatch = useDispatch()
	const { contacts } = useSelector((state: any) => state.contacts)

	const [searchTerm, setSearchTerm] = useState('')
	const [contactsData, setContactsData] = useState({} as Contact[])

	useEffect(() => {
		dispatch(getContacts())
	}, [dispatch])

	useEffect(() => {
		setContactsData(contacts)
		const filteredData = contacts.filter((contact: Contact) =>
			contact.name.toLowerCase().includes(searchTerm)
		)
		setContactsData(filteredData)
	}, [contacts, searchTerm])

	useEffect(() => {
		console.log(contactsData)
		console.log(contacts)
	}, [contactsData, contacts])

	return isAuth ? (
		<Layout>
			<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			<ContactList contacts={contactsData} />
		</Layout>
	) : (
		<Navigate to={'/login'} />
	)
}

export default Contacts
