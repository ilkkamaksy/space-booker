import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import Register from './components/forms/Register'
import Login from './components/forms/Login'

function App(): React.ReactElement  {

	const logout = () => {
		localStorage.removeItem('token')
		window.location.href = '/'
	}

	const user = undefined

	return (
		<div className="App">
			<Header logout={logout} user={user} />

			<Route exact path="/">
				<Home />
			</Route>

			<Route exact path="/register" component={Register} />
			<Route exact path="/login" component={Login} />

		</div>
	)
}

export default App
