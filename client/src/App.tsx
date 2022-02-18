import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Contacts from './pages/contacts'
import Login from './pages/login'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Contacts />} />
				<Route path='login' element={<Login />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
