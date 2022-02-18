import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import Contact from '../store/contact'
import { deleteContact } from '../store/slices/contactSlice'
import ContactForm from './ContactForm'
import Modal from './Modal'

const ContactItem: FC<{ contact: Contact }> = ({ contact }) => {
	const [open, setOpen] = useState(false)
	const dispatch = useDispatch()

	const dialogHandle = () => {
		setOpen(!open)
	}

	return (
		<>
			<div className='flex flex-col pb-2 overflow-auto'>
				<div
					className='relative flex flex-col items-start p-4 mt-3 bg-gray-200 rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100'
					draggable='true'
				>
					<button
						className='absolute top-0 right-2  items-center justify-center text-right hidden mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex'
						// onClick={() => setUpdatePage(contact.id)}
						onClick={dialogHandle}
					>
						Edit
					</button>
					<button
						className='absolute top-7 right-2  items-center justify-center hidden text-right mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex'
						onClick={() => {
							dispatch(deleteContact(contact.id))
						}}
					>
						Delete
					</button>

					<div className='rounded-md text-lg font-medium text-gray-800'>
						<div className='flex items-center w-full '>
							<div className='flex items-center'>
								<span className='ml-1 leading-none'>
									{contact.name}
								</span>
							</div>
						</div>

						<div className='flex items-center w-full mt-3 text-sm font-medium text-gray-400'>
							<div className='flex items-center'>
								<span className='ml-1 leading-none'>
									{contact.phone}
								</span>
							</div>
						</div>

						<div className='flex items-center w-full mt-3 text-sm font-medium text-gray-400'>
							<div className='flex items-center'>
								<span className='ml-1 leading-none'>
									{contact.email}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			{open && (
				<Modal open={open} onDialogHandle={dialogHandle}>
					<ContactForm id={contact.id} />
				</Modal>
			)}
		</>
	)
}

export default ContactItem
