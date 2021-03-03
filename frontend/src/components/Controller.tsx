import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { useQuery } from 'react-query'

import { AppState } from '../store/types'
import { setToken, setUser, logoutUser } from '../store/actions/user'

import { me } from '../services/queries'

import Header from './Header'
import Home from '../pages/Home'
import Register from './forms/Register'
import Login from './forms/Login'
import Dashboard from '../pages/Dashboard'
import EditAccount from '../pages/EditAccount'
import Services from '../pages/Services'
import EditService from '../pages/EditService'
import Calendar from './Calendar'

import { UserType } from '../types'
    
const mapStateToProps = (state: AppState) => ({
	token: state.userdata.token,
	user: state.userdata.user
})
  
type Props = ReturnType<typeof mapStateToProps>;

interface DispatchProps { 
    setToken: (token:string) => void,
    setUser: (user:UserType|undefined) => void,
	logoutUser: () => void 
}

const Controller = ({ token, user, setToken, setUser, logoutUser }: Props & DispatchProps):React.ReactElement => {
    
	const query = useQuery(['me', token], () => me(token), { 
		enabled: !!token,
		onError: () => {
			localStorage.removeItem('access_token')
			logoutUser()
		},
	})
    
	useEffect(() => {
		setToken(localStorage.getItem('access_token') ?? '')
		if (query.isSuccess) {
			setUser({ username: query.data?.data?.username, email: query.data?.data?.email })
		}
	}, [query])

	console.log(query)

	return (
		<div>
			<Header />

			<Route exact path="/" component={Home} />
			
			{!!user && <Route exact path="/dashboard" component={Dashboard} />}
			{!!user && <Route exact path="/add-account" component={EditAccount} />}
			{!!user && <Route path='/account/:id/edit' component={EditAccount} />}
			{!!user && <Route exact path='/account/:accountId/services' component={Services} />}
			{!!user && <Route path='/account/:accountId/services/add' component={EditService} />}
			{!!user && <Route path='/account/:accountId/services/:serviceId/edit' component={EditService} />}
			
			<Route path='/account/:accountId/calendar' component={Calendar} />

			{!user && <Route exact path="/register" component={Register} />}
			{!user && <Route exact path="/login" component={Login} />}
		</div>
	)
}

export default connect(mapStateToProps, {
	setToken,
	setUser,
	logoutUser
})(Controller)