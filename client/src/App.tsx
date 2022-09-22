import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ContactScreen from './screens/ContactScreen'
import LoginScreen from './screens/LoginScreen'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<ContactScreen />} />
				<Route path='/login' element={<LoginScreen />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
