import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { useQuery } from 'react-query'

import { AppState } from '../store/types'
import { setToken, setUser, logoutUser } from '../store/actions/user'

import { me, getAccounts } from '../services/queries'

import { setAccounts, doneAction } from '../store/actions/accounts'

import Header from './Header'
import Home from '../pages/Home'
import Register from './forms/Register'
import Login from './forms/Login'
import Dashboard from '../pages/Dashboard'
import EditAccount from '../pages/EditAccount'
import ManageAccountUsers from '../pages/ManageAccountUsers'
import ManageAccount from '../pages/ManageAccount'
import ManageBookings from '../pages/ManageBookings'
import EditService from '../pages/EditService'
import Calendar from './Calendar'
import Loader from './Loader'

import { Account, UserType } from '../types'
    
const mapStateToProps = (state: AppState) => ({
	token: state.userdata.token,
	user: state.userdata.user,
	loggedOut: state.userdata.loggedOut,
	accountdata: state.accountdata
})
  
type Props = ReturnType<typeof mapStateToProps>;

interface DispatchProps { 
    setToken: (token:string) => void
    setUser: (user:UserType|undefined) => void
	logoutUser: () => void 
	setAccounts: (accounts:Account[]) => void
	doneAction: () => void
}

const Controller = ({ 
	token, 
	loggedOut,
	accountdata,
	user,
	setToken, 
	setUser, 
	logoutUser,
	setAccounts,
	doneAction
}: Props & DispatchProps):React.ReactElement => {
    
	const queryMe = useQuery(['me', token], () => me(token), { 
		enabled: !!token,
		onError: () => {
			localStorage.removeItem('access_token')
			logoutUser()
		},
	})

	const queryAccounts = useQuery(['getAccounts', accountdata], getAccounts, { 
		enabled: accountdata.accounts.length === 0 && !!user,
		onError: () => doneAction()
	})
    
	console.log(queryAccounts, accountdata.updatingAccounts)
	useEffect(() => {
		setToken(localStorage.getItem('access_token') ?? '')
		if (queryMe.isSuccess) {
			setUser({ username: queryMe.data?.data?.username, email: queryMe.data?.data?.email })
		}

		if (
			queryAccounts.isSuccess && 
            accountdata.accounts.length === 0 && 
            queryAccounts.data.data
		) {
			setAccounts(queryAccounts.data.data)
		}

	}, [queryMe, queryAccounts])

	if (loggedOut) {
		window.location.href = '/'
	}

	return (
		<div>
			<Header />

			<Route exact path="/" component={Home} />
			
			<Route exact path="/dashboard" component={Dashboard} />

			<Route exact path="/add-account" component={EditAccount} />
			<Route path='/account/:id/edit' component={EditAccount} />
			<Route path='/account/:accountId/users' component={ManageAccountUsers} />
			
			<Route path='/account/:accountId/services/add' component={EditService} />
			<Route path='/account/:accountId/services/:serviceId/edit' component={EditService} />
			<Route exact path='/account/:accountId/manage' component={ManageAccount} />
			<Route path='/account/:accountId/bookings' component={ManageBookings} />
			
			
			<Route path='/account/:accountId/calendar' component={Calendar} />

			<Route exact path="/register" component={Register} />
			<Route exact path="/login" component={Login} />
			
			{accountdata.updatingAccounts && !!user && <Loader />}
		</div>
	)
}

export default connect(mapStateToProps, {
	setToken,
	setUser,
	logoutUser,
	setAccounts,
	doneAction
})(Controller)