import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { useQuery } from 'react-query'

import { AppState } from '../store/types'
import { setToken, setUser } from '../store/actions/user'

import { me } from '../services/queries'

import Header from './Header'
import Home from '../pages/Home'
import Register from './forms/Register'
import Login from './forms/Login'
import Dashboard from '../pages/Dashboard'
import EditAccount from './forms/EditAccount'

import { UserType } from '../types'
import Calendar from './Calendar'
    
const mapStateToProps = (state: AppState) => ({
	token: state.userdata.token,
	user: state.userdata.user
})
  
type Props = ReturnType<typeof mapStateToProps>;

interface DispatchProps { 
    setToken: (token:string) => void,
    setUser: (user:UserType) => void, 
}

const Wrapper = ({ token, user, setToken, setUser }: Props & DispatchProps):React.ReactElement => {
    
	const query = useQuery(['me', token], () => me(token), { 
		enabled: !!token,
		onError: () => {
			setToken('')
			localStorage.removeItem('access_token')
		},
	})
    
	useEffect(() => {
		setToken(localStorage.getItem('access_token') ?? '')
		if (query.isSuccess) {
			setUser({ username: query.data?.data?.username, email: query.data?.data?.email })
		}
	}, [query])

	return (
		<div>
			<Header user={user} />

			<Route exact path="/" component={Home} />
			<Route exact path="/dashboard" component={Dashboard} />
			<Route exact path="/add-account" component={EditAccount} />
			<Route path='/account/:id' component={Calendar} />


			<Route exact path="/register" component={Register} />
			<Route exact path="/login" component={Login} />
		</div>
	)
}

export default connect(mapStateToProps, {
	setToken,
	setUser
})(Wrapper)