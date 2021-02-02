import React from 'react'
import { Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

import { me } from './services/queries'

import Header from './components/Header'
import Home from './pages/Home'
import Register from './components/forms/Register'
import Login from './components/forms/Login'

import './App.css'


const queryClient = new QueryClient()

function App(): React.ReactElement  {
	return (
		<QueryClientProvider client={queryClient}>
			<Wrapper />
		</QueryClientProvider>
	)
}

const Wrapper = ():React.ReactElement => {
	
	let token = localStorage.getItem('access_token') ?? undefined
	
	const query = useQuery(['me', token], () => me(token), { 
		enabled: !!token,
		onError: () => {
			token = undefined
			localStorage.removeItem('access_token')
		}
	})

	const user = query.data?.data 
	console.log('meeeee', query)

	const logout = () => {
		localStorage.removeItem('access_token')
		window.location.href = '/'
	}

	return (
		<div>
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
