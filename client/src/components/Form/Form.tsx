import { FC, FormEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { AppDispatch } from '../../store'
import { IContacts } from '../../store/slices/contactSlice'
import styles from './Form.module.scss'

interface ILogin {
	id: number | null
	submit: (name: string, phone: string) => void
	fetchLoading: boolean
}

const Form: FC<ILogin> = ({ id, submit, fetchLoading }) => {
	const contactData = useTypedSelector(state =>
		state.contacts.contacts.find((contact: IContacts) => contact.id === id)
	)

	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')

	const [nameDirty, setNameDirty] = useState(false)
	const [phoneDirty, setPhoneDirty] = useState(false)

	const [nameError, setNameError] = useState('Имя не должно быть пустым')
	const [phoneError, setPhoneError] = useState(
		'Телефон не должен быть пустым'
	)

	const [formValid, setFormValid] = useState(false)

	const nameHandler = (e: FormEvent<HTMLInputElement>) => {
		setName(e.currentTarget.value)
		if (!e.currentTarget.value) {
			setNameError('Имя не должно быть пустым')
		} else {
			setNameError('')
		}
	}
	const phoneHandler = (e: FormEvent<HTMLInputElement>) => {
		setPhone(e.currentTarget.value)
		if (!e.currentTarget.value) {
			setPhoneError('Телефон не должен быть пустым')
		} else {
			setPhoneError('')
		}
	}

	const blurHandler = (e: FormEvent<HTMLInputElement>) => {
		switch (e.currentTarget.name) {
			case 'name':
				setNameDirty(true)
				break
			case 'phone':
				setPhoneDirty(true)
				break
		}
	}

	useEffect(() => {
		if ((!name && !phone) || nameError || phoneError) {
			setFormValid(false)
		} else {
			setFormValid(true)
		}
	}, [nameError, phoneError, name, phone])

	useEffect(() => {
		if (id && contactData) {
			setName(contactData.name)
			setPhone(contactData.phone)
		}
	}, [contactData, id])

	useEffect(() => {
		if (!fetchLoading) {
			setName('')
			setPhone('')
		}
	}, [fetchLoading])

	return (
		<div className={styles.form}>
			<form
				onSubmit={e => {
					e.preventDefault()
					submit(name, phone)
				}}
			>
				<div className={styles.inputGroup}>
					<label htmlFor='name'>Имя</label>
					<input
						onBlur={blurHandler}
						type='text'
						id='name'
						name='name'
						value={name}
						onChange={nameHandler}
						className={
							nameDirty && nameError
								? styles.notValid
								: styles.valid
						}
					/>
				</div>
				<div className={styles.inputGroup}>
					<label htmlFor='tel'>Номер телефона</label>
					<input
						onBlur={blurHandler}
						type='tel'
						id='tel'
						name='name'
						value={phone}
						onChange={phoneHandler}
						className={
							phoneDirty && phoneError
								? styles.notValid
								: styles.valid
						}
					/>
				</div>
				<div className={styles.submit}>
					<button disabled={!formValid || fetchLoading} type='submit'>
						{fetchLoading ? 'Загрузка...' : 'Добавить'}
					</button>
				</div>
			</form>
		</div>
	)
}

export default Form
