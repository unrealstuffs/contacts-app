import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { setUser } from '../store/slices/userSlice'
import Form from '../components/Form'
import { useState } from 'react'
import Layout from '../layout'

const Login = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [error, setError] = useState(false)

	const loginHandler = async (email: string, password: string) => {
		await axios
			.post('http://localhost:5000/login', {
				email,
				password,
			})
			.then((res: any) => {
				dispatch(
					setUser({
						email: res.data.user.email,
						id: res.data.user.id,
						accessToken: res.data.accessToken,
					})
				)
				localStorage.setItem('token', res.data.accessToken)
				navigate('/')
			})
			.catch((err: any) => {
				setError(true)
				console.log(err)
			})
	}

	return (
		<Layout>
			<Form handleSubmit={loginHandler} error={error} />
		</Layout>
	)
}

export default Login
