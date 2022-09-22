import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Login from '../components/Login/Login'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import Background from '../ui/Background/Background'

const LoginScreen = () => {
	const navigate = useNavigate()
	const { setUser } = useActions()
	const { accessToken } = useTypedSelector(state => state.user)

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const submitHandler = async (email: string, password: string) => {
		try {
			setLoading(true)
			const response = await fetch('http://localhost:3001/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			})
			const data = await response.json()

			if (data.accessToken) {
				setUser({ user: data.user, accessToken: data.accessToken })
				setLoading(false)
				navigate('/')
			} else {
				setError(data)
				setLoading(false)
			}
		} catch (err) {
			setError('Ошибка при отправке запроса')
			setLoading(false)
		}
	}

	return (
		<>
			{accessToken && <Navigate to='/' replace={true} />}
			<Background>
				<Login
					submit={submitHandler}
					fetchLoading={loading}
					fetchError={error}
				/>
			</Background>
		</>
	)
}

export default LoginScreen
