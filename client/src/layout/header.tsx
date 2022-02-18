import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ContactForm from '../components/ContactForm'
import Modal from '../components/Modal'
import useAuth from '../hooks/useAuth'
import { removeUser } from '../store/slices/userSlice'

const Header = () => {
	const [open, setOpen] = useState(false)
	const { isAuth } = useAuth()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const dialogHandle = () => {
		setOpen(!open)
	}

	const logoutHandler = async () => {
		dispatch(removeUser())
		localStorage.removeItem('token')
		navigate('/login')
	}

	return (
		<>
			<div className='bg-white shadow'>
				<div className='container mx-auto px-4'>
					<div className='flex items-center justify-between py-4'>
						<div className='font-bold text-xl'>Contacts App</div>

						<div className='flex items-center'>
							{isAuth && (
								<>
									<button
										className='text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4'
										onClick={dialogHandle}
									>
										Add contact
									</button>
									<button
										className='text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4'
										onClick={logoutHandler}
									>
										Sign out
									</button>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
			{open && (
				<Modal open={open} onDialogHandle={dialogHandle}>
					<ContactForm id={null} />
				</Modal>
			)}
		</>
	)
}

export default Header
