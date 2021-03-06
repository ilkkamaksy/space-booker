import React from 'react'
import { connect } from 'react-redux'
import {
	useParams,
	Redirect
} from 'react-router-dom'
import {
	Container,
	makeStyles,
	createStyles,
} from '@material-ui/core'

import { AppState } from '../store/types'

import ServiceForm from '../components/forms/EditService'

import NotAllowed from '../components/NotAllowed'

import { isAdmin, isOwner } from '../utils/helpers'

const stylesInUse = makeStyles(() =>
	createStyles({
		root: {
			background: '#FFFFFF',
			position: 'relative',
			justifyContent: 'center',
			alignItems: 'center',

		},
		header: {
			background: '#6A0572',
			justifyContent: 'center',
			alignItems: 'center',
			paddingTop: '40px',
			paddingBottom: '50px',
			color:'#ffffff'
		},
		content: {

		},
		intro: {
			color: '#ffffff',
			textAlign: 'center',
			position: 'relative',
			zIndex: 1,
		},
		heading_1: {
			fontSize: '3rem',
			position: 'relative',
			fontWeight: 'bold',
			letterSpacing: -1,
			margin: '1rem 0 0.5rem 0',
		},
		heading_2: {
			fontSize: '2rem',
			position: 'relative',
			fontWeight: 'bold',
			letterSpacing: -1,
			marginBottom: '1rem',
		},
		introText: {
			fontSize: '1.2rem',
			margin: '0.5rem auto 1rem',
		},
		notice: {
			fontSize: '1em',
			margin: '1rem 0 1.5rem',
			color:'#111'
		},
	})
)

interface RouteParams {
	accountId: string|undefined
    serviceId: string|undefined
}
  
const mapStateToProps = (state: AppState) => ({
	accountdata: state.accountdata,
	me: state.userdata.user,
	updateUser: state.userdata.updateUser
})
  
type Props = ReturnType<typeof mapStateToProps>

const EditService = ({ accountdata, me, updateUser }: Props):React.ReactElement => {

	const { accountId, serviceId } = useParams<RouteParams>()

	if (!accountId) {
		<Redirect to="/dashboard" />
	}

	const account = accountId ? accountdata.accounts.find(acc => acc.id === parseInt(accountId)) : undefined
	const serviceToEdit = serviceId ? account?.services.find(service => service.id === parseInt(serviceId)) : undefined

	if (
		!updateUser && !me && 
		account && !(isAdmin(me, account) || isOwner(me, account))
	) {
		return <NotAllowed />
	}

	const title = serviceId ? 'Edit space' : 'Add new space'

	const classes = stylesInUse()

	return (
		<div className={classes.root}>
			<div className={classes.header}>
				<Container maxWidth="xl">
					<h1 className={classes.heading_1}>{title}</h1>
				</Container>
			</div>

			<div className={classes.content}>
				<Container maxWidth="xl">
					<h2 className={classes.heading_2}>Enter the space information</h2>

					<ServiceForm account={account} serviceToEdit={serviceToEdit} />
					
				</Container>
			</div>
		</div>
	)
}

export default connect(mapStateToProps)(EditService)