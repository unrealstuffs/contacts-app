import { useSelector } from 'react-redux'

const useAuth = () => {
	const { email, token, id } = useSelector((state: any) => state.user)

	return {
		isAuth: !!localStorage.getItem('token'),
		email,
		token,
		id,
	}
}

export default useAuth
