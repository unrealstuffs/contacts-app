import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Contact from '../store/contact'
import { addNewContact, updateContact } from '../store/slices/contactSlice'

const ContactForm: FC<{ id: string | null }> = ({ id }) => {
	const dispatch = useDispatch()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')

	const [nameError, setNameError] = useState('')
	const [emailError, setEmailError] = useState('')
	const [phoneError, setPhoneError] = useState('')

	const validate = () => {
		const re =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

		if (!name) {
			setNameError('Введите Имя')
			return false
		}
		if (!phone || phone.length < 11) {
			setPhoneError('Введите корректный телефон')
			return false
		}
		if (!email || !re.test(email)) {
			setEmailError('Введите корректный E-mail')
			return false
		}
		setNameError('')
		setPhoneError('')
		setEmailError('')
		return true
	}

	const contactData = useSelector((state: any) =>
		state.contacts.contacts.find((contact: Contact) => contact.id === id)
	)

	useEffect(() => {
		if (id) {
			setName(contactData.name)
			setPhone(contactData.phone)
			setEmail(contactData.email)
		}
	}, [contactData, id])

	const onSubmit = (e: any) => {
		e.preventDefault()
		if (validate()) {
			if (id) {
				dispatch(updateContact({ id, name, email, phone }))
			} else {
				dispatch(addNewContact({ name, email, phone }))
			}
		}
	}

	return (
		<form>
			<div className='form-group mb-6'>
				<p className='text-sm text-red-500 font-bold'>{nameError}</p>
				<input
					type='text'
					className='form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
					id='exampleInput7'
					placeholder='Name'
					value={name}
					onChange={(e: any) => setName(e.target.value)}
					style={{
						border: nameError ? '1px solid rgb(239 68 68)' : '',
					}}
				/>
			</div>
			<div className='form-group mb-6'>
				<p className='text-sm text-red-500 font-bold mb-2'>
					{phoneError}
				</p>
				<input
					type='phone'
					className='form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
					id='exampleInput8'
					placeholder='Phone'
					value={phone}
					onChange={(e: any) => setPhone(e.target.value)}
					style={{
						border: phoneError ? '1px solid rgb(239 68 68)' : '',
					}}
				/>
			</div>
			<div className='form-group mb-6'>
				<p className='text-sm text-red-500 font-bold mb-2'>
					{emailError}
				</p>
				<input
					type='email'
					className='form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
					id='exampleInput8'
					placeholder='Email address'
					value={email}
					onChange={(e: any) => setEmail(e.target.value)}
					style={{
						border: emailError ? '1px solid rgb(239 68 68)' : '',
					}}
				/>
			</div>

			<button
				onClick={onSubmit}
				type='submit'
				className='
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out'
			>
				Send
			</button>
		</form>
	)
}

export default ContactForm
