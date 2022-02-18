import { FC } from 'react'
import Contact from '../store/contact'
import ContactItem from './Contact'

const ContactList: FC<{ contacts: Contact[] }> = ({ contacts }) => {
	return (
		<div className='grid grid-cols-3 gap-4 mt-4'>
			{contacts.length
				? contacts.map((contact: Contact) => (
						<ContactItem key={contact.id} contact={contact} />
				  ))
				: 'No data'}
		</div>
	)
}

export default ContactList
