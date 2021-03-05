import React from 'react'
import { connect } from 'react-redux'
import {
	useParams
} from 'react-router-dom'
import {
	Container,
	makeStyles,
	createStyles,
} from '@material-ui/core'

import { AppState } from '../store/types'

import AccountForm from '../components/forms/EditAccount'

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
	id: string|undefined
}
  
const mapStateToProps = (state: AppState) => ({
	accountdata: state.accountdata,
	me: state.userdata.user
})
  
type Props = ReturnType<typeof mapStateToProps>

const EditAccount = ({ accountdata, me }: Props):React.ReactElement => {

	const { id } = useParams<RouteParams>()

	const accountToEdit = id ? accountdata.accounts.find(acc => acc.id === parseInt(id)) : undefined
	const title = id ? 'Edit organization' : 'Add new organization'

	const classes = stylesInUse()

	if (!me || accountToEdit && !(isAdmin(me, accountToEdit) || isOwner(me, accountToEdit))) {
		return <NotAllowed />
	}

	return (
		<div className={classes.root}>
			<div className={classes.header}>
				<Container maxWidth="xl">
					<h1 className={classes.heading_1}>{title}</h1>
				</Container>
			</div>

			<div className={classes.content}>
				<Container maxWidth="xl">
					<h2 className={classes.heading_2}>General information</h2>
					<p className={classes.introText}>
						Edit the name, website url and free description of your organization.
					</p>
					
					<AccountForm accountToEdit={accountToEdit} />
				</Container>
			</div>
		</div>
	)
}

export default connect(mapStateToProps)(EditAccount)