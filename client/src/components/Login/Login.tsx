import { useState, FormEvent, useEffect, FC } from 'react'

import styles from './Login.module.scss'

interface ILogin {
	submit: (email: string, password: string) => void
	fetchError: string
	fetchLoading: boolean
}

const Login: FC<ILogin> = ({ submit, fetchError, fetchLoading }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [emailDirty, setEmailDirty] = useState(false)
	const [passwordDirty, setPasswordDirty] = useState(false)

	const [emailError, setEmailError] = useState('Email не должен быть пустым')
	const [passwordError, setPasswordError] = useState(
		'Пароль не должен быть пустым'
	)

	const [formValid, setFormValid] = useState(false)

	const loginHandler = (e: FormEvent<HTMLInputElement>) => {
		setEmail(e.currentTarget.value)
		if (!e.currentTarget.value) {
			setEmailError('Email не должен быть пустым')
		} else {
			setEmailError('')
		}
	}
	const passwordHandler = (e: FormEvent<HTMLInputElement>) => {
		setPassword(e.currentTarget.value)
		if (!e.currentTarget.value) {
			setPasswordError('Пароль не должен быть пустым')
		} else {
			setPasswordError('')
		}
	}

	const blurHandler = (e: FormEvent<HTMLInputElement>) => {
		switch (e.currentTarget.name) {
			case 'login':
				setEmailDirty(true)
				break
			case 'password':
				setPasswordDirty(true)
				break
		}
	}

	useEffect(() => {
		if (emailError || passwordError) {
			setFormValid(false)
		} else {
			setFormValid(true)
		}
	}, [emailError, passwordError])

	return (
		<div className={styles.login}>
			<form
				onSubmit={e => {
					e.preventDefault()
					submit(email, password)
				}}
			>
				<h1 className={styles.loginTitle}>Вход</h1>
				<div className={styles.inputGroup}>
					<label htmlFor='email'>Email</label>
					<input
						onBlur={blurHandler}
						type='email'
						value={email}
						onChange={loginHandler}
						id='email'
						name='email'
						className={
							emailDirty && emailError
								? styles.notValid
								: styles.valid
						}
					/>
				</div>
				<div className={styles.inputGroup}>
					<label htmlFor='password'>Пароль</label>
					<input
						onBlur={blurHandler}
						type='password'
						value={password}
						onChange={passwordHandler}
						id='password'
						name='password'
						className={
							passwordDirty && passwordError
								? styles.notValid
								: styles.valid
						}
					/>
				</div>
				{fetchError && (
					<div className={styles.error}>Ошибка: {fetchError}</div>
				)}
				<div className={styles.submit}>
					<button disabled={!formValid || fetchLoading} type='submit'>
						{fetchLoading ? 'Загрузка...' : 'Войти'}
					</button>
				</div>
			</form>
		</div>
	)
}

export default Login
